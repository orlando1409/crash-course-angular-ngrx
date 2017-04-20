import * as clock from '../actions/clock';
import { Action } from '@ngrx/store';

export interface State {
    date: Date;
};

const initialState: State = {
  date: new Date(),
};

export function reducer(state = initialState , {type, payload} : Action): State{
    const newDate = new Date(state.date.getTime());

    switch(type){
        case clock.SECOND:
            newDate.setSeconds(newDate.getSeconds() + payload);
            return {date: newDate };
        case clock.HOUR:
            newDate.setHours(newDate.getHours() + payload);
            return {date: newDate };
    }
    
    return state;
} 

export const getDate = (state: State) => state.date;