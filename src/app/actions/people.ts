import { Action } from '@ngrx/store';

export const ADVANCE = 'advance';

export class Advance implements Action {
  readonly type = ADVANCE;
}  

export type Actions
  = Advance;



