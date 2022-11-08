import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentInfo } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-list-of-students',
  templateUrl: './list-of-students.component.html',
  styleUrls: ['./list-of-students.component.css'],
})
export class ListOfStudentsComponent implements OnInit {
  somez: string = ' n';
  eidd: number = 0;

  constructor(
    private studentService: StudentService,
    private act: ActivatedRoute
  ) {}

  student: StudentInfo = new StudentInfo();
  studentList: StudentInfo[] = [];
  allstudentList: Observable<StudentInfo[]>[] = [];

  getStudents(): void {
    //debugger;
    this.studentService.getStudents().subscribe((result) => {
      this.studentList = result;
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.getStudents();
  }

  deleteStudent(id: any): void {
    var userid = id; // assign this value from your UI
    this.studentService.deleteStudent(userid).subscribe((result) => {
      var irecCount = result;
      if (irecCount > 0) alert('Record Deleted');
    });
  }
}
