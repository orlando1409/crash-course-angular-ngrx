import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as book from '../actions/book';
import * as fromPeople from '../reducers/people';
import * as fromRoot from '../reducers';

import {ADVANCE, RECALL} from '../actions/people';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {HOUR, SECOND} from '../actions/clock';

import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { State } from '../reducers/index';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'bc-clock-page',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <input #inputNum type="number" value="0">
      <button (click)="click$.next(inputNum.value)">Update</button>      
      <clock [time]="time | async"></clock>
      <div (click)="person$.next(person)" *ngFor="let person of people | async">
        {{person.name}} is in {{person.time | date: 'jms'}}
      </div>
      <button (click)="recall$.next()">Recall</button>
  `
})
/*This component takes care of things like streams and observables as well as showing the values asynchronously */
export class ClockPageComponent implements OnDestroy {
  click$ = new Subject()
            .map((value) => ({type: HOUR, payload: parseInt(value.toString())}));
  recall$ = new Subject();
  person$ = new Subject()
            .map((value)=>{
              console.log('click on person');              
              return ({payload: value, type: ADVANCE})}
            );
  seconds$ =  Observable
            .interval(1000)
            .map((value) => ({type: SECOND, payload:1}));
  time: Observable<Date>;
  people: Observable<Array<any>>;

  constructor(store: Store<State>) {
    this.time = store.select(fromRoot.getClock);
    this.people = store.select(fromRoot.getPeople);

    Observable.merge(
      this.click$,
      /*this.seconds$,*/
      this.person$,
      this.recall$
        .withLatestFrom(this.time, (_, y)=> y)
        .map((time) =>({type:RECALL, payload: time}))
    ).subscribe(store.dispatch.bind(store)) 
  }

  ngOnDestroy() {
    
  }
}
