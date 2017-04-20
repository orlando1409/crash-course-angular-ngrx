import { Action } from '@ngrx/store';

export const ADVANCE = 'advance';
export const RECALL = 'recall';


export class Advance implements Action {
  readonly type = ADVANCE;
}  


export class Recall implements Action {
  readonly type = RECALL;
}  


export type Actions
  = Advance |
    Recall;

