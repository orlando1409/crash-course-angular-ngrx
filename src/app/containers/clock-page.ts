import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { State } from '../reducers/index';

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
        <button (click)="click$.next()">Update</button>
    <h1>{{clock$ | async | date: 'fullDate'}} {{clock$ | async | date: 'mediumTime'}}</h1>
  `
})
export class ClockPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  clock$:any;
  click$ = new Subject();

  constructor(store: Store<State>) {
    console.log('get Clock value:');    
    this.clock$ = store.select(fromRoot.getClock);

    //console.log(this.clock$);

    Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    ).subscribe((type) => {
      console.log('bringing type');
      console.log(type);
      store.dispatch({type});
    }) 
  }

  ngOnDestroy() {
    
  }
}
