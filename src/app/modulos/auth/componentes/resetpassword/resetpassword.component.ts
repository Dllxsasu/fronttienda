import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
errorMessage = '';
  successMessage = '';
  passwordType = 0;
  newPasswordType = 0;
  token: any;
  loadingList: boolean = false;
  isValid: boolean = true;
  user = {
    password: '',
    newpassword: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.token = params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.loadingList = true;
    this.authService.validateResetToken(this.token)
      .subscribe(res => {
        this.loadingList = false;
        this.isValid = true;
        // this.user.email = '';
        // this.successMessage = this.translate.instant('FORGOT_PASSWORD.SENT_LINK');
      }, err => {
        this.isValid = false;
        this.loadingList = false;
        // this.errorMessage = this.translate.instant('FORGOT_PASSWORD.USER_NOT_FOUND');
      });
  }

  showPassword() {
    if (this.passwordType == 0) {
      this.passwordType = 1;
    }
    else {
      this.passwordType = 0;
    }
  }
  showNewPassword() {
    if (this.newPasswordType == 0) {
      this.newPasswordType = 1;
    }
    else {
      this.newPasswordType = 0;
    }

  }

  
  onClickSubmit() {
    this.loadingList = true;
    this.errorMessage = '';
    let param = { 'password': this.user.password, 'repeatPassword': this.user.newpassword }
    this.authService.resetPassword(this.token, param)
      .subscribe(res => {
        this.loadingList = false;
        this.user = {
          password: '',
          newpassword: ''
        }
        this.successMessage = this.translate.instant('FORGOT_PASSWORD.SUCCESS');
        setTimeout(() => {
          this.router.navigate(['auth']);
        }, 2000);
      }, err => {
        this.loadingList = false;
        this.errorMessage = this.translate.instant('FORGOT_PASSWORD.FAIL');
      });
  }
}
