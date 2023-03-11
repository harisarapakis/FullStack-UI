import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './components/add-employee/add-employee.component';
import { EditEmployeesComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
