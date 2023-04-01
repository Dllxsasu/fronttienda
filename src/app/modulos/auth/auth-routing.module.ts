import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ForgotpasswordComponent } from './componentes/forgotpassword/forgotpassword.component';

const routes: Routes = [{
  path: '', component: AuthComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotpasswordComponent },
    // { path: 'user/:id/reset/:id', component: ResetPasswordComponent },
    // {
    //   path: 'sign-up', children: [
    //     { path: '', component: SignUpComponent },
    //   ]
    // },
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
