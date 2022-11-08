export class StudentInfo {
  UserId: number = 0;
  FirstName: string = '';
  LastName: string = '';
  ContactNumber: string = '';
  Address: string = '';
  City: string = '';
  State: string = '';
  Country: string = '';
  PostalCode: string = '';
  LoginID: string = '';
  Password: string = '';
  RecordState: any = '';
  CreatedBy: any;
  CreatedDate: any;
  ModifiedDate: any;
  EmailId: string = '';
  QualificationDetails: QualificationDetail[] = [];
}

export class QualificationDetail {
  Id: number = 0;
  UserId: number = 0;
  DegreeName: string = '';
  YearofPass: number = 0;
  CollageName: string = '';
  Grade: string = '';
  EmployeeId: string = '';
}

export class OrderStatus {
  constructor() {}
  public StatusId: number = 0;
  public StatusName: string = '';
}
