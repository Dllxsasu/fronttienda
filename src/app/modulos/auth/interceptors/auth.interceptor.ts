import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { TokenService } from "../services/token.service";
import { AuthService } from "../services/auth.service";
import {Observable, map} from 'rxjs';
@Injectable()
export class AuthIntecerpetor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject:BehaviorSubject<string> = new BehaviorSubject<string>("");


    constructor(
        private tokenService:TokenService,
        private authService:AuthService
    ){

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log("entro por aqui")
        const token = this.tokenService.getToken();
       if(token){
        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)})
        console.log("añadio el beare")
       }
    
        return next.handle(request)
            .pipe(
                map((event:HttpEvent<any>) => {
                    if(event instanceof HttpResponse){
                        if(event.status === 0 || event.status == 401){
                            this.authService.logout();
                        }
                    }
                    return event;
                })
            );
    
      }
}