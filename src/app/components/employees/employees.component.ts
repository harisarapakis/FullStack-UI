import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{

  constructor(private employeeService: EmployeeService,
    private auth: AuthService) {}

  employees = this.employeeService.employees$;

  ngOnInit() {
    this.employeeService.getAllEmployees();
    this.auth.getUsers().subscribe();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id);
  }
}
