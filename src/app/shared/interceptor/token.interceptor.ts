import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../model/model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private router: Router,    
    private snackBar: MatSnackBar,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }

    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.handUnAutorizedError(request, next)
          }
        }
        return throwError(() => new Error("Some other error occured"))
      } 
    ));
  }

  handUnAutorizedError(req: HttpRequest<any>, next: HttpHandler){
    const accessToken = this.auth.getToken();
    const refreshToken = this.auth.getRefreshToken();

    const tokenModel = <TokenApiModel>{
      refreshToken:refreshToken,
      accessToken: accessToken
    }
    return this.auth.renewToken(tokenModel).pipe(
      switchMap((data:TokenApiModel) => {
        this.auth.setRefreshToken(data.refreshToken)
        this.auth.setToken(data.accessToken)

        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req)
      }),
      catchError((err) => {
        return throwError(() => {
          this.snackBar.open('Token is expired, Please Login again!', 'Dismiss', {
            duration: 3000
          });
          this.router.navigate(['login'])
        })
      })
    );
  }
}
