import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StudentsmodelComponent } from './studentsmodel/studentsmodel.component';
import { ListOfStudentsComponent } from './list-of-students/list-of-students.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsmodelComponent,
    ListOfStudentsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    //HttpModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, AppRoutingModule],
})
export class AppModule {}
