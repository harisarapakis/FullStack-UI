import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, switchMap } from 'rxjs';
import { EmployeeService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeesComponent implements OnInit{
  form = new FormGroup({});
  employeeId: any;
  constructor(public employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {}

  employees = this.employeeService.getAllEmployees();

  ngOnInit() {
    this.initializeForm();
    this.route.paramMap.pipe(switchMap(params => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        return this.employeeService.getEmployee(this.employeeId);
      } else {
        return EMPTY;
      }
    }),
      map(employee => {
        return this.form.setValue(employee);
      })).subscribe()

  }

  initializeForm(){
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      salary: new FormControl(''),
      department: new FormControl('')
    })
  }

  editEmployee() {
    this.employeeService.editEmployee(this.employeeId, this.form.value)
    this.router.navigate(['employees'])
  }

}
