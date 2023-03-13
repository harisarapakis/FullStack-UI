import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/shared/model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) { 
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseApiUrl}User/register`, userObj);
  }

  login(logInObj: any){
    return this.http.post<any>(`${this.baseApiUrl}User/authendicated`, logInObj);
  }

  getUsers(){
    return this.http.get<any>(`${this.baseApiUrl}User`);
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<TokenApiModel>(`${this.baseApiUrl}User/refresh`, tokenApi)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  setRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }
  getToken(): string {
    return localStorage.getItem('token')!;
  }
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken')!;
  }
  isLoggenIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }


}
