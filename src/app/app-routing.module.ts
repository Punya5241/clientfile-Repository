import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfStudentsComponent } from './list-of-students/list-of-students.component';
import { StudentsComponent } from './students/students.component';
import { StudentsmodelComponent } from './studentsmodel/studentsmodel.component';

const routes: Routes = [
  { path: '', redirectTo: '/studentlist', pathMatch: 'full' },
  { path: 'studentlist', component: StudentsComponent },
  { path: 'studentmodel', component: StudentsmodelComponent },
  { path: 'ListOfStudents', component: ListOfStudentsComponent },
  { path: 'studentmodel/:EIdd', component: StudentsmodelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
