import { Action } from '@ngrx/store';

export const hour =   'hour';
export const second =  'second';


export class Hour implements Action {
  readonly type = hour;
}
  
export class Second implements Action {
  readonly type = second;
}


export type Actions
  = Hour
  | Second;



