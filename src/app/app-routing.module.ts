import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEmployeesComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditEmployeesComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employees/add',
        component: AddEmployeesComponent
      },
      {
        path: 'employees/edit/:id',
        component: EditEmployeesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
