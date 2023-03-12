import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  constructor() { }

  public getRoles(){
    return this.role$.asObservable();
  }
  public getFullName(){
    return this.fullName$.asObservable();
  }
  
  public setRole(role: string){
    this.role$.next(role)
  }
  public setFullName(fullname: string){
    this.fullName$.next(fullname)
  }
}
