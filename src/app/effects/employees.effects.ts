import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as appActions from '../actions/app.actions';
import * as employeeActions from '../actions/employee.action';
import { switchMap, map } from 'rxjs/operators';
import { EmployeeEntity } from '../reducers/employees.reducer';


@Injectable()
export class EmployeeEffects {

  // EmployeeAdded -> (api call goes here) -> EmployeeSuccessfully
  // EmployeeAdded -> (api call goes here) -> EmployeeAddedSuccessfully
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.employeeAdded),
      switchMap(a => this.client.post<EmployeeEntity>('http://localhost:1337/employees', {
        firstName: a.payload.firstName,
        lastName: a.payload.lastName,
        department: a.payload.department
      }).pipe(
        map(savedEmployee => employeeActions.employeeAddedSuccessfully(
          {
            oldId: a.payload.id,
            employee: savedEmployee
          }))
      )
      )
    ), { dispatch: true }
  );
  // ApplicationStarted -> (call the api... and then dispatch an action) -> employeesLoadedSuccessfully
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      switchMap(() => this.client.get<GetEmployeesResponse>('http://localhost:1337/employees')
        .pipe(
          map(response => response.data),
          map(payload => employeeActions.employeesLoadedSuccessfully({ payload }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private client: HttpClient) { }

}

interface GetEmployeesResponse {
  data: EmployeeEntity[];
}
