export class EmployeeReq {
  constructor(
    public type: string,
    public employeeId?: number,
    public employeeName?: string,
    public employeeSalary?: number,
    public joinedDate?: string,
    public contactNo?: number,
    public emailID?: string,
    public jobRole?: string
  ) {}
}
