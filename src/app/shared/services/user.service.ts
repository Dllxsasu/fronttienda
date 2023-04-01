import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { ACCESSROLES } from '../const/access-roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userIdString = "userId";
  roles = {
    canAccessToOrder:false,
    isSuperadmin:false,
    isAdmin:false,
    isAdminStore:false,
    isAdminCatalogue:false,
    isAdminOrder:false,
    isAdminContent:false,
    isCustomer:false,
    isAdminRetail:false
  }
  constructor(
    private crudService:CrudService) { }

    destroyUserId(){
      localStorage.removeItem(this.userIdString);
    }
    saveUserId(userId:string){
      localStorage.setItem(this.userIdString, userId );
    }

    getUserProfile():Observable<any> {
      return this.crudService.get('/v1/private/user/profile');
    }


    checkForAccess(arrayRoles:any[]){
      ACCESSROLES.forEach(
        role =>{
          arrayRoles.forEach(item => {
            if(item.name == role.name){
                this.roles.canAccessToOrder = true;
            }


            switch(item.name){
              case 'SUPERADMIN':
                this.roles.isSuperadmin = true;
                break;
              case 'ADMIN':
                this.roles.isAdmin = true;
                break;
              case 'ADMIN_CATALOGUE':
                this.roles.isAdminCatalogue = true;
                break;
              case 'ADMIN_STORE':
                this.roles.isAdminStore = true;
                break;
              case 'ADMIN_ORDER':
                this.roles.isAdminOrder = true;
                break;
              case 'ADMIN_CONTENT':
                this.roles.isAdminContent = true;
                break;
              case 'CUSTOMER':
                this.roles.isCustomer = true;
                break;
              case 'ADMIN_RETAIL':
                this.roles.isAdminRetail = true;
                break;
            }
          });
        }
      )
    }
  }
