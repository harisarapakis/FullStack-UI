import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgetPasswordModalComponent } from './components/login/forgot-password-modal/forgot-password-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeesComponent,
    NavbarComponent,
    EditEmployeesComponent,
    DeleteEmployeesComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgetPasswordModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
