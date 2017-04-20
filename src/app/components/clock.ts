import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'clock',
    template: `<h1>{{time | date: 'fullDate'}} {{time | date: 'mediumTime'}}</h1>`
})
/*This component does not need to know about the asynchrouns nature of the value that is display */
export class ClockComponent{
    @Input() time: Observable<Date>;
}