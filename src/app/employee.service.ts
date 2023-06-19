import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Employee } from './employee.model';
import { EmployeeReq } from './employeeReq.model';
import { EmployeeRes } from './employeeRes.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  EmployeeList: Employee[] = [];
  private latestData = new Subject<Employee[]>();
  private editData = new Subject<Employee>();
  constructor(private http: HttpClient) {}

  getEmployee(ReqObj: EmployeeReq) {
    return this.http.post<EmployeeRes>(
      'http://localhost:59621/api/Employee/EmployeeData',
      ReqObj
    );
  }

  sendEmployee(tableData: Employee[]) {
    this.latestData.next(tableData);
  }
  recieveEmployee(): Observable<Employee[]> {
    return this.latestData.asObservable();
  }

  sendEditData(editData: Employee) {
    this.editData.next(editData);
  }

  receiveEditEmployee() {
    return this.editData.asObservable();
  }
}
