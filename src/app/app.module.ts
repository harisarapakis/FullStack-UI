import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeesComponent } from './components/add-employee/add-employee.component';
import { DeleteEmployeesComponent } from './components/delete-employee/delete-employee.component';
import { EditEmployeesComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeesComponent,
    NavbarComponent,
    EditEmployeesComponent,
    DeleteEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
