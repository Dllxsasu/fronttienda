import { Inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from "@angular/common/http";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError,retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modulos/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalerrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    return next.handle(request).pipe(
   retry(1),
   catchError((error) =>{
    let errorMessage = '';
    console.log('In error ** ' + error.status);
    if (error.status == 0) {
      this.router.navigate(['errorPage']);
    }
    if(error.status === 404 && request.url.search(/login/gi) !==-1){        
    }else if(error.status !== 401){
      if(error.error instanceof ErrorEvent){
        errorMessage = `${this.translate.instant('COMMON.ERROR_CODE')}: ${error.error.message}`;
      } else{
        errorMessage = this.translate.instant('COMMON.ERROR_CODE') + `: ${error.status}\n
          ${this.translate.instant('COMMON.MESSAGE')}: ${error.message}`;
      }
      if(error.status !== 404) {
        if(error.status === 500) {
          this.router.navigate(['/pages/error-500']);
        }
      }
    }else if(error.status === 401 ){
      this.authService.logout();
    }
    console.log("llega hasta aqui");
    return throwError(error);
   })
      );
    
  }
}
/*
export const globalErrorxInterceptor:HttpInterceptorFn = (req, next) => {
  const router = Inject(Router);
  const authService = Inject(AuthService);
  const tranlsate = Inject(TranslateService);
  const toastr = Inject(ToastrService);


  return next.handle(req).pipe;
};

*/