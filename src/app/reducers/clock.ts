import * as clock from '../actions/clock';

export interface State {
    date: Date;
};

const initialState: State = {
  date: new Date(),
};

export function reducer(state = initialState , action: clock.Actions): State{
    
    if (Object.prototype.toString.call(state) === '[object Date]'){
        console.log(state);        
    }
   /* else{
        console.log('needs to be converted');
        const ob:any = state;
        console.log(ob);
        state = ob.clock;
    }*/

    console.log('================='); 
    console.log('accumulator----->');
    console.log(state);   
    console.log('================='); 
    const newDate = new Date(state.date.getTime());

    switch(action.type){
        case 'second':
            newDate.setSeconds(newDate.getSeconds() +1);
            return {date: newDate };
        case 'hour':
            newDate.setHours(newDate.getHours()+1);
            return {date: newDate };
    }
    
    return state;
} 

export const getDate = (state: State) => state.date;