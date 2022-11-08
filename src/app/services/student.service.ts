import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentInfo } from 'src/app/models/student';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export const hostingUrl: string = 'http://localhost:6441';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({}),
  };

  setHttpOptions(): void {
    this.httpOptions = {
      headers: new HttpHeaders({}),
    };
  }

  SuccessAdminCheck(result: any): void {}

  ErrorAdminCheck(result: any): void {}

  getStudents(): Observable<StudentInfo[]> {
    //debugger;
    this.setHttpOptions();
    return this.http
      .get<StudentInfo[]>(
        hostingUrl + '/api/student/getstudents/',
        this.httpOptions
      )
      .pipe(
        tap(
          // Check the Valid request
          (data) => this.SuccessAdminCheck(data),
          (error) => this.ErrorAdminCheck(error)
        )
      );
  }

  getStudent(id: any): Observable<StudentInfo> {
    //debugger;
    this.setHttpOptions();
    return this.http
      .get<StudentInfo>(
        hostingUrl + '/api/student/getstudent/' + id,
        this.httpOptions
      )
      .pipe(
        tap(
          // Check the Valid request
          (data) => this.SuccessAdminCheck(data),
          (error) => this.ErrorAdminCheck(error)
        )
      );
  }

  saveStudent(student: StudentInfo): Observable<number> {
    debugger;
    this.setHttpOptions();
    return this.http
      .post<number>(
        hostingUrl + '/api/student/savestudent/',
        student,
        this.httpOptions
      )
      .pipe(
        tap(
          // Check the Valid request
          (data) => this.SuccessAdminCheck(data),
          (error) => this.ErrorAdminCheck(error)
        )
      );
  }

  updateStudent(student: StudentInfo): Observable<number> {
    debugger;
    this.setHttpOptions();
    return this.http
      .post<number>(
        hostingUrl + '/api/student/updatestudent/',
        student,
        this.httpOptions
      )
      .pipe(
        tap(
          // Check the Valid request
          (data) => this.SuccessAdminCheck(data),
          (error) => this.ErrorAdminCheck(error)
        )
      );
  }

  deleteStudent(id: any): Observable<any> {
    this.setHttpOptions();
    return this.http
      .get<any>(
        hostingUrl + '/api/student/deletestudent/' + id,
        this.httpOptions
      )
      .pipe(
        tap(
          // Check the Valid request
          (data) => this.SuccessAdminCheck(data),
          (error) => this.ErrorAdminCheck(error)
        )
      );
  }
}
