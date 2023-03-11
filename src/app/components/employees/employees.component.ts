import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{

  constructor(private employeeService: EmployeeService) {}

  employees = this.employeeService.employees$;

  ngOnInit() {
    this.employeeService.getAllEmployees();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
