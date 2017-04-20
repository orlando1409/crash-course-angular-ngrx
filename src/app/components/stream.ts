import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'bc-stream',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{clock | async | date: ['fullDate']}} {{clock | async | date: ['mediumTime']}}</h1>
  `
})
export class StreamComponent implements OnInit {
  click$ = new Subject();

  clock:any;

  constructor() {
    this.clock = Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    ).startWith((new Date()).toString())
      .scan((acc, curr) => {
        const accDate = new Date(acc);
        const date= new Date(accDate.getTime());
        
        if(curr === 'second'){
          date.setSeconds(date.getSeconds()+1);
        }

        if (curr ==='hour'){
          date.setHours(date.getHours()+1);
        }

        return date;
      });    
  }

  ngOnInit() {
  }
}
