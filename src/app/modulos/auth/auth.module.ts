import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ForgotpasswordComponent } from './componentes/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './componentes/resetpassword/resetpassword.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AuthComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
