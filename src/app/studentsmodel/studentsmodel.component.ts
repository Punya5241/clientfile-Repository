import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentInfo } from '../models/student';
import { QualificationDetail } from '../models/student';
import { StudentService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Console } from 'console';

@Component({
  selector: 'app-studentsmodel',
  templateUrl: './studentsmodel.component.html',
  styleUrls: ['./studentsmodel.component.css'],
})
export class StudentsmodelComponent implements OnInit {
  url: string = 'http://localhost:6441/api/student/deleteQualificationDetails';
  eidd: number = 0;
  data: any;
  closeResult = '';
  listdata: any;
  childindexVal: number = 0;
  closeModal: string = '';
  frmUserSave: NgForm | undefined | string;

  msg: string = '';
  rows: any = [];
  constructor(
    private studentService: StudentService,
    private act: ActivatedRoute,
    private routs: Router,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
    this.act.params.subscribe((params) => {
      const some = params['EIdd'];
      // console.log(some.eidd)
      let x: number = params['EIdd'];
      this.eidd = x as number;
    });
  }

  studentList: StudentInfo[] = [];
  allstudentList: Observable<StudentInfo[]>[] = [];

  qualficationdtls: QualificationDetail[] = [];

  QualificationDetails: QualificationDetail = {
    Id: 0,
    UserId: 0,
    DegreeName: '',
    YearofPass: 0,
    CollageName: '',
    Grade: '',
    EmployeeId: '',
    // push: function (qualification: QualificationDetail[]): void {
    //   throw new Error('Function not implemented.');
    // }
  };

  student: StudentInfo = {
    UserId: 0,
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    Address: '',
    City: '',
    State: '',
    Country: '',
    PostalCode: '',
    LoginID: '',
    Password: '',
    RecordState: undefined,
    CreatedBy: undefined,
    CreatedDate: undefined,
    ModifiedDate: undefined,
    EmailId: '',
    QualificationDetails: [],
  };

  getStudent(): void {
    var userid = this.eidd; // assign this value from your UI

    this.studentService.getStudent(userid).subscribe((result) => {
      debugger;
      this.student = result;

      console.log('result', result);
      console.log('this.student', this.student);

      console.log('details', this.qualficationdtls);

      //console.log(JSON.stringify(this.student));
      alert(JSON.stringify(this.student));
    });
  }

  ngOnInit(): void {
    if (this.eidd != undefined) {
      this.getStudent();
    }
  }

  StudentSave(): void {
    if (this.eidd == 0 || this.eidd == null) {
      debugger;
      console.log(this.eidd);
      // this.qualficationdtls.push(this.QualificationDetails);
      // this.student.QualificationDetails = this.qualficationdtls;
      this.studentService.saveStudent(this.student).subscribe((result) => {
        var irecCount = result;
        if (irecCount > 0) alert('Record Saved');
        this.routs.navigate(['ListOfStudents']);
      });
    } else {
      if (this.Delete.length > 0) {
        this.Delete.forEach((element) => {
          this.delete(element).subscribe((result) => {});
        });
      }
      // this.qualficationdtls.push(this.QualificationDetails);
      // this.student.QualificationDetails = this.qualficationdtls;
      this.studentService.updateStudent(this.student).subscribe((result) => {
        var irecCount = result;
        if (irecCount > 0) alert('Record Updated');
        this.routs.navigate(['ListOfStudents']);
      });
    }
  }

  SubmitForm(form: any) {
    console.log(form.value);
    this.http.post(this.url, form.value).subscribe((result) => {
      console.log('Saved');
      console.log(form.value);
    });
  }

  need: number = 0;

  OpenPopUp(content: any) {
    this.need++;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  countt: number = 1;
  Details: any[] = [];

  SaveDetails(regForm: any) {
    if (this.countt < 5) {
      debugger;
      console.log(regForm.value);

      // when there is no id
      if (this.eidd == 0 || this.eidd == null) {
        this.student.QualificationDetails.push(regForm.value);
        console.log(this.student.QualificationDetails);
        this.countt++;
        this.clear();
        this.modalService.dismissAll();
      } else {
        if (this.need > 0) {
          //alert('nned > 0');
          this.student.QualificationDetails.push(regForm.value);
          this.need--;
          this.clear();
          this.modalService.dismissAll();
        } else {
          //alert('nned 0');

          this.student.QualificationDetails[this.childindexVal].DegreeName =
            this.QualificationDetails.DegreeName;
          this.student.QualificationDetails[this.childindexVal].YearofPass =
            this.QualificationDetails.YearofPass;
          this.student.QualificationDetails[this.childindexVal].CollageName =
            this.QualificationDetails.CollageName;
          this.student.QualificationDetails[this.childindexVal].Grade =
            this.QualificationDetails.Grade;
          this.student.QualificationDetails[this.childindexVal].EmployeeId =
            this.QualificationDetails.EmployeeId;
          this.modalService.dismissAll();
        }
      }
    } else {
      alert("Can't Add More Than 5 Rows");
      this.modalService.dismissAll();
    }
  }

  clear() {
    this.QualificationDetails.DegreeName = '';
    this.QualificationDetails.YearofPass = 0;
    this.QualificationDetails.CollageName = '';
    this.QualificationDetails.Grade = '';
    this.QualificationDetails.EmployeeId = '';
  }

  Delete: any[] = [];
  DeleteQualificationDetails(row: any, ChildId: any) {
    this.Delete.push(ChildId);
    // debugger;
    // if (confirm('Do You Really Want To Delete The Record..')) {
    //   this.delete(Id).subscribe((result) => {});
    //   window.location.reload();
    // }
    this.student.QualificationDetails.forEach((value, index) => {
      if (value == row) {
        this.student.QualificationDetails.splice(index, 1);
        console.log('delete', this.student.QualificationDetails);
      }
    });
  }
  delete(idd: number) {
    return this.http.delete(this.url + '/' + idd);
  }

  EditChildTable(childindex: any, content: any) {
    this.childindexVal = childindex;

    // console.log(this.)
    console.log('CHILD DATA', this.student.QualificationDetails[0].Id);

    this.QualificationDetails.DegreeName =
      this.student.QualificationDetails[childindex].DegreeName;
    this.QualificationDetails.YearofPass =
      this.student.QualificationDetails[childindex].YearofPass;
    this.QualificationDetails.CollageName =
      this.student.QualificationDetails[childindex].CollageName;
    this.QualificationDetails.Grade =
      this.student.QualificationDetails[childindex].Grade;
    this.QualificationDetails.EmployeeId =
      this.student.QualificationDetails[childindex].EmployeeId;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
    return false;
  }
}
