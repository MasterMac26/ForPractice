import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  editMode: boolean = false;
  editID: number | null = null;
  subscription: Subscription;
  @ViewChild('empForm', { static: false }) empForm: any;
  constructor(private empService: EmployeeService) {
    this.subscription = this.empService
      .receiveEditEmployee()
      .subscribe((data) => {
        this.editMode = true;
        this.editID = data.employeeId;
        this.empForm.controls['employeeName'].setValue(data.employeeName);
        this.empForm.controls['employeeSalary'].setValue(data.employeeSalary);
        this.empForm.controls['joinedDate'].setValue(
          data.joinedDate.substring(0, 10)
        );
        this.empForm.controls['contactNo'].setValue(data.contactNo);
        this.empForm.controls['emailID'].setValue(data.emailID);
        this.empForm.controls['jobRole'].setValue(data.jobRole);
      });
  }

  OnSubmit() {
    this.empForm.value.employeeId = this.editID ? this.editID : null;
    this.empForm.value.type = 'saveorupdate';
    this.empForm.value.joinedDate = this.empForm.value.joinedDate.substring(
      0,
      10
    );
    this.empService.getEmployee(this.empForm.value).subscribe((data) => {
      console.log(data);
      this.empService.sendEmployee(data.EmployeeList);
    });
    this.editMode = false;
    this.editID = null;
    this.empForm.resetForm();
  }

  OnCancel() {
    this.editMode = false;
    this.editID = null;
    this.empForm.resetForm();
  }
}
