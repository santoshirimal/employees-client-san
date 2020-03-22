import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/employee.action';

export interface EmployeeEntity {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
}

export interface EmployeeState extends EntityState<EmployeeEntity> {

}

export const adapter = createEntityAdapter<EmployeeEntity>();

const initialState = adapter.getInitialState();
// const initialState: EmployeeState = {
//   ids: ['1', '2'],
//   entities: {
//     1: { id: '1', firstName: 'Joe', lastName: 'Schmidt', department: 'DEV' },
//     2: { id: '2', firstName: 'Tim', lastName: 'Edgar', department: 'CEO' }
//   }
// };
const reducerFunction = createReducer(
  initialState,
  on(actions.employeesLoadedSuccessfully, (s, a) => adapter.setAll(a.payload, s)),
  on(actions.employeeAdded, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.employeeAddedSuccessfully, (s, a) => {
    const tempState = adapter.removeOne(a.oldId, s);
    return adapter.addOne(a.employee, tempState);
  }),
  on(actions.employeeFired, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.employeeFiredFailure, (s, a) => adapter.addOne(a.payload, s))
);

export function reducer(state: EmployeeState = initialState, action: Action) {
  return reducerFunction(state, action);
}
