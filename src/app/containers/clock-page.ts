import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';
import { Subject } from 'rxjs/Subject';
import { State } from '../reducers/index';
import {HOUR, SECOND} from '../actions/clock';

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
  `
})
/*This component takes care of things like streams and observables as well as showing the values asynchronously */
export class ClockPageComponent implements OnDestroy {
  click$ = new Subject()
            .map((value) => ({type: HOUR, payload: parseInt(value.toString())}));
  seconds$ =  Observable
            .interval(1000)
            .map((value) => ({type: SECOND, payload:3}));
  time: Observable<Date>;

  getValidDate(date:Date){        
    return new Date(date);
  }            

  constructor(store: Store<State>) {
    this.time = store.select(fromRoot.getClock);

    Observable.merge(
      this.click$,
      this.seconds$,
    ).subscribe(store.dispatch.bind(store)) 
  }

  ngOnDestroy() {
    
  }
}
