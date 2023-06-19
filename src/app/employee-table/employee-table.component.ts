import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { EmployeeReq } from '../employeeReq.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit, OnDestroy {
  EmployeeTable: Employee[] = [];
  subscription: Subscription;

  req: EmployeeReq = {
    type: 'search',
  };

  constructor(private empService: EmployeeService) {
    this.subscription = this.empService.recieveEmployee().subscribe((data) => {
      if (data) this.EmployeeTable = data;
    });
  }

  ngOnInit(): void {
    this.empService
      .getEmployee(this.req)
      .subscribe((data) => this.empService.sendEmployee(data.EmployeeList));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  OnEdit(Id: number) {
    let ReqObj: EmployeeReq = { type: 'edit', employeeId: Id };
    this.empService.getEmployee(ReqObj).subscribe((data) => {
      this.empService.sendEditData(data.EmployeeList[0]);
    });
  }
  OnDelete(Id: number) {
    let ReqObj: EmployeeReq = { type: 'delete', employeeId: Id };
    this.empService
      .getEmployee(ReqObj)
      .subscribe((data) => this.empService.sendEmployee(data.EmployeeList));
  }
}
