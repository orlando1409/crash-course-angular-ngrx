import { Action } from '@ngrx/store';

export const HOUR =   'hour';
export const SECOND =  'second';


export class Hour implements Action {
  readonly type = HOUR;
}
  
export class Second implements Action {
  readonly type = SECOND;
}


export type Actions
  = Hour
  | Second;



