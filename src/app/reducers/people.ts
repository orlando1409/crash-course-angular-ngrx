import 'rxjs/add/operator/map';

import * as clock from './clock';

import { ADVANCE, RECALL } from './../actions/people';

import { Action } from '@ngrx/store';
import { HOUR } from "./../actions/clock";

export interface State {
    people: Array<any>;
};

const initialState: State = {
  people: [ {name: "Sara", time: clock.getDate()},
            {name: "John", time: clock.getDate()},
            {name: "Nancy", time: clock.getDate()},
            {name: "Drew", time: clock.getDate()},
  ],
};

export function reducer(state = initialState, {type, payload} = {type: "", payload: ""}): State{
    switch(type){        
        case ADVANCE:                       
            return {    people: state.people.map((person)=>{
                                if (payload === person){
                                    return {
                                        name: person.name,
                                        time: clock.reducer({date:person.time}, {type: HOUR, payload: 6}).date    
                                    }
                                }
                                return person;                    
            })}
        case RECALL:
            console.log('recall call reached');
            return {    people: state.people.map((person) =>{
                            return {    
                                name: person.name,
                                time: payload
            }})}               
        default:
            return initialState;
    }    
} 

export const getPeople = (state = initialState) => state.people;