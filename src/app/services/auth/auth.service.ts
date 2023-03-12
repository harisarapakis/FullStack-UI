import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodeToken()
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseApiUrl}User/register`, userObj);
  }

  login(logInObj: any){
    return this.http.post<any>(`${this.baseApiUrl}User/authendicated`, logInObj);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  isLoggenIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }


}
