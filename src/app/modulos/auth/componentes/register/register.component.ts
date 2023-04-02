import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/shared/services/config.service';
import { PlatformLocation } from '@angular/common';
import { PasswordValidator } from '../../validators/PasswordValidator';
import { globalValidators } from 'src/app/shared/validator/globalValidators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPass = 0;
  isCodeUnique = false;
  errorMessage = "";
  successMessage = "";
  form!:FormGroup;
  countries:any[] =[];
  provinces:any[] =[];
  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toast:ToastrService,
    private tranlaste:TranslateService,
    private configService:ConfigService,
    private translate:TranslateService,
    private location:Location,
    private platformLocation:PlatformLocation
  ){
    this.configService.getListOfCountries().subscribe(
      data=>{
        this.countries =data;
      },
      err =>{

      }
    );

  }

  countryIsSelected(code){
    this.provinces = [];
    this.configService.getListOfZonesProvincesByCountry(code)
    .subscribe(prov =>{
      this.provinces = [...prov];
    },
    errror =>{
      this.toast.error(this.tranlaste.instant("STORE_FORM.ERROR_STATE_PROVINCE"));
    }
    )

  }

  ngOnInit(){
    this.form =this.fb.group({
      address:['', [Validators.required]],
      city:['', [Validators.required]],
      code:['', [Validators.required]],
      country:['', [Validators.required]],
      email:['', [Validators.required]],
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      name:['', [Validators.required]],
      password:['',[
        Validators.required,
        globalValidators.passwordStrong
        
      ]],
      postalCode:['',Validators.required],
      repeatPassword:['', [
                      Validators.required,
                     // globalValidators.passwordMatch,
                     // globalValidators.required
                    ]],
      state:['',Validators.required],
      province:['',Validators.required],
    //  url:['',Validators.required],
    },{
      validators: globalValidators.passwordMatch
    }
  )
  }

  checkCode(evt) {
    const code = evt.target.value;
    this.authService.checkIfStoreExist(code)
      .subscribe(res => {
        console.log(res);
        this.isCodeUnique =res.exists;
      });
  }

  passwordType(){
    return this.showPass;
  }
  get formControls(){
    return this.form.controls;
  }
  showPassword(){
    if(this.showPass ==0){
      this.showPass = 1;
    }else{
      this.showPass =0;
    }
  }



  onRegister(){
   let param = this.form.value;
  // console.log(location.origin);
   console.log( this.location.prepareExternalUrl('/'))
   param.url = location.origin + this.location.prepareExternalUrl('/')
   console.log(param);
   this.authService.register(param)
   .subscribe(res => {
     console.log(res);
     this.errorMessage = ""
     this.successMessage = "Your account is created successfully and email has been sent to " + this.form.value.email + " with details on completing the new store signup"
    
     ///they have to send to 
     alert("to login");
   }, err => {
     console.log(err);
     if (err.status === 0) {
       this.errorMessage = this.translate.instant('COMMON.INTERNAL_SERVER_ERROR');
     } else {
       this.errorMessage = err.error.message;
     }

   });
  }
  onClickLogin() {
    this.router.navigate(['auth']);
  }
}
