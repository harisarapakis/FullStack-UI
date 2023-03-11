import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from "rxjs";
import { Employee } from "src/app/shared/model/model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{

    private employeesSubject = new BehaviorSubject<Employee[]>([]);
    employees$ = this.employeesSubject.asObservable();
  

    baseApiUrl: string = environment.baseApiUrl;
    constructor(private http: HttpClient) {}


    getAllEmployees() {
        this.http.get<Employee[]>(this.baseApiUrl + 'employees').subscribe(employees => {
          this.employeesSubject.next(employees);
        });
      }
    // getAllEmployees() : Observable<Employee[]> {
    //    return this.http.get<Employee[]>(this.baseApiUrl + 'employees')
    // }

    getEmployee(id: string) : Observable<Employee> {
        return this.http.get<Employee>(this.baseApiUrl + 'employees/' + id)
    }

     addEmployee(request: Employee) {
        this.http.post<Employee>(this.baseApiUrl + 'employees', request).subscribe(addedEmployee => {
          const currentEmployees = this.employeesSubject.getValue();
          currentEmployees.push(addedEmployee);
          this.employeesSubject.next(currentEmployees);
        });
      }
    
      editEmployee(id: string, request: Employee) {
        this.http.put<Employee>(this.baseApiUrl + 'employees/' + id, request).subscribe(updatedEmployee => {
          const currentEmployees = this.employeesSubject.getValue();
          const index = currentEmployees.findIndex(e => e.id === updatedEmployee.id);
          if (index !== -1) {
            currentEmployees[index] = updatedEmployee;
            this.employeesSubject.next(currentEmployees);
          }
        });
      }
    // addEmployee(request: Employee) : Observable<Employee> {
    //     return this.http.post<Employee>(this.baseApiUrl + 'employees', request)
    // }

    // editEmployee(id: string, request: Employee) : Observable<Employee> {
    //     return this.http.put<Employee>(this.baseApiUrl + 'employees/' + id, request)
    // }

    deleteEmployee(id: string) {
        this.http.delete(this.baseApiUrl + 'employees/' + id).subscribe(() => {
          const currentEmployees = this.employeesSubject.getValue();
          const filteredEmployees = currentEmployees.filter(e => e.id !== id);
          this.employeesSubject.next(filteredEmployees);
        });
      }
    }
    // deleteEmployee(id: string) : Observable<Employee> {
    //     return this.http.delete<Employee>(this.baseApiUrl + 'employees/' + id)
    // }