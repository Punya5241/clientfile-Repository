import { Component, OnInit } from '@angular/core';
import { StudentService, hostingUrl } from '../services/student.service';
import { StudentInfo, QualificationDetail, OrderStatus } from 'src/app/models/student';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private studentService: StudentService) { }
  student: StudentInfo = new StudentInfo();
  studentList: StudentInfo[] = [];
  qualificationlist: QualificationDetail[] = [];
  //allstudentList: Observable<StudentInfo[]>[] = [];
  orderStatus: OrderStatus[] = [];
  userid: number = 0;

  public OrderStatusList = [
    { id: 1, name: 'ordered' },   //orderstatus
    { id: 2, name: 'shipped' },
    { id: 3, name: 'In Transit' },
    { id: 4, name: 'out for delivery' },
    { id: 5, name: 'Delivered' }
  ]

  ngOnInit(): void {
    //this.getStudents();
    this.userid = 2;

    let ostatus = new OrderStatus();
    ostatus.StatusId = 1;
    ostatus.StatusName = "Ordered";
    this.orderStatus.push(ostatus);
  }

  getStudents(): void {
 
    this.studentService.getStudents().subscribe(result => {
      this.studentList = result;
      alert("No of records fetched : " + this.studentList.length);
    });
  }

  getStudent(): void {
  
    this.studentService.getStudent(this.userid).subscribe(result => {
      this.student = result;
      alert(JSON.stringify(this.student));
    });
  }

  saveStudent() {
    let student = new StudentInfo();
    student.FirstName = "anil";
    student.LastName = "karanam";
    student.ContactNumber = "12345";
    student.Address = "xyz";
    student.City = "Hyd";
    student.State = "TS";
    student.Country = "India";
    student.PostalCode = "500089";
    student.LoginID = "anil";
    student.Password = "anil";
    student.EmailId = "anil@a.com";
    student.RecordState = true;

    var qualification = new QualificationDetail();
    qualification.UserId = student.UserId;
    qualification.CollageName = "STBC";
    qualification.DegreeName = "MCA";
    qualification.Grade = "I";
    qualification.EmployeeId = "";
    qualification.YearofPass = 2002;

    this.qualificationlist.push(qualification);

    var qualification = new QualificationDetail();
    qualification.UserId = student.UserId;
    qualification.CollageName = "STBC";
    qualification.DegreeName = "MCA";
    qualification.Grade = "I";
    qualification.EmployeeId = "";
    qualification.YearofPass = 2002;

    this.qualificationlist.push(qualification);

    student.QualificationDetails = this.qualificationlist;

    this.studentService.saveStudent(student).subscribe(result => {
      var irecCount = result;
      if (irecCount > 0)
        alert("Record Saved");
    });
  }

  updateStudent() {
    
    this.studentService.getStudent(this.userid).subscribe(result => {
      this.student = result;

       
      this.student.FirstName = "anil kumar - update1";
      this.student.LastName = "karanam";
      this.student.ContactNumber = "987654";
      this.student.Address = "sr nagar";

      if (this.student.QualificationDetails.length > 0) {
        this.student.QualificationDetails[0].CollageName = "STBC - UPDATE";
        this.student.QualificationDetails[0].YearofPass = 2002;
      }

      this.studentService.updateStudent(this.student).subscribe(result => {
        var irecCount = result;
        if (irecCount > 0)
          alert("Record Updated");
      });

    });
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.userid).subscribe(result => {
      var irecCount = result;
      if (irecCount > 0)
        alert("Record Deleted");
    });
  }

}
