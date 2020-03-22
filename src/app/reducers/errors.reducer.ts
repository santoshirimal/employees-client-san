import { Action, createReducer, on } from '@ngrx/store';
import * as employeeActions from '../actions/employee.action';
import * as errorsActions from '../actions/errors.action';

export interface ErrorsState {
  hasError: boolean;
  errorMessage: string;
}


const initialState: ErrorsState = {
  hasError: false,
  errorMessage: null
};


export function reducer(state: ErrorsState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(employeeActions.employeeFiredFailure, (s, a) => ({
    hasError: true,
    errorMessage: a.errorMessage
  })),
  on(errorsActions.clearError, () => initialState)
);
