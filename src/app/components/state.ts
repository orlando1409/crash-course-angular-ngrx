import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'bc-state',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{clock | async | date: ['fullDate']}} {{clock | async | date: ['mediumTime']}}</h1>
  `
})
export class StateComponent implements OnInit {
  click$ = new Subject();
  clock:any;

  constructor() {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(1000)
    ).startWith(new Date())
      .scan((acc, curr) => {
        console.log('accumulator');
        const accDate = new Date(acc.toString());
        console.log(accDate);
        const date: Date = new Date(accDate.getTime());
        
        date.setSeconds(date.getSeconds()+1);

        return date;
      });    
  }

  ngOnInit() {
  }
}
