import * as clock from '../actions/clock';
import { Action } from '@ngrx/store';
import { SECOND, HOUR } from "../actions/clock";

export interface State {
    date: Date;
};

const initialState: State = {
  date: new Date(),
};

export function reducer(state = initialState , {type, payload} : Action): State{
    const newDate = new Date(state.date.getTime());

    switch(type){
        case SECOND:
            newDate.setSeconds(newDate.getSeconds() + payload);
            return {date: newDate };
        case HOUR:
            newDate.setHours(newDate.getHours() + payload);
            return {date: newDate };
        default:
            return state;
    }
} 

export const getDate = (state = initialState) => state.date;