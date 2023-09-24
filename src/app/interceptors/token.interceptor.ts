import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: ApiService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err);
          if(err.status === 401 || err.status === 0){
            return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=>err);
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);

        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        });
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          //this.toast.warning({detail:"WARNING", summary:"Token is expired, Please login again !", duration:3000});
          this.router.navigateByUrl("login");
          this.auth.signOut();
        })
      })
    );
  }
}
