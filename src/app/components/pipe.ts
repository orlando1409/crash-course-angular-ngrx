import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'bc-pipe',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{clock | async | date: ['fullDate']}} {{clock | async | date: ['mediumTime']}}</h1>
  `
})
export class PipeComponent implements OnInit {
  /*This component uses both pipes and subjects and merge*/
  click$ = new Subject();
  clock:any;

  constructor() {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(5000)
    ).map(()=> new Date());
  }

  ngOnInit() {
  }
}
