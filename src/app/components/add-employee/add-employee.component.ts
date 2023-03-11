import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeesComponent implements OnInit{
  form = new FormGroup({});
  constructor(public employeeService: EmployeeService,
    private router: Router) {}

  employees = this.employeeService.getAllEmployees();

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      salary: new FormControl(''),
      department: new FormControl('')
    })
  }

  addEmployee() {
    this.employeeService.addEmployee(this.form.value); 
    this.router.navigate(['employees']);
  }

}
