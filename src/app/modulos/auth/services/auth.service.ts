import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import {Router} from '@angular/router';
import {Observable,map} from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';
import { UserService } from 'src/app/shared/services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService:TokenService,
    private crudService:CrudService,
    private userService:UserService,
    private router:Router
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.crudService.post('/v1/private/login', { username, password });
  }
  logout() {
    this.tokenService.destroyToken();
    this.userService.destroyUserId();
    this.userService.roles = {
      canAccessToOrder: false,
      isSuperadmin: false,
      isAdmin: false,
      isAdminCatalogue: false,
      isAdminStore: false,
      isAdminOrder: false,
      isAdminContent: false,
      isCustomer: false,
      isAdminRetail: false,
    };
    localStorage.removeItem('roles');
    localStorage.removeItem('merchant');
    this.router.navigate(['auth']);
  }

}
