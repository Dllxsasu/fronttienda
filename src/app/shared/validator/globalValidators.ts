import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class globalValidators {
   

    static passwordStrong(control: AbstractControl): ValidationErrors|null {
        const PASS_REGEXP = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,12}$/;
        if (isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
          }
          return PASS_REGEXP.test(control.value) ? null : {'passwordstrong': true};
      }
      static required(control: AbstractControl): ValidationErrors|null {
        return requiredValidator(control);
      }
      
    static passwordMatch(controlGroup: FormGroup) {
       // console.log(controlGroup)
       const control = controlGroup.controls['password'];
          const matchingControl = controlGroup.controls['repeatPassword'];
         // console.log("cont")
         // console.log(control);
         // console.log(matchingControl )
          if(matchingControl.value==""){
            matchingControl.setErrors({ 'required': true });
            return;
          }
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'passwordMatch': true });
          } else {
            matchingControl.setErrors(null);
          }
        
        return null;
        /*
        return (formGroup: FormGroup) => {
          const control = controlGroup['password'];
          const matchingControl = formGroup.controls['repeatPassword'];
          console.log("cont")
          console.log(control);
          console.log(matchingControl )
          
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'passwordMatch': true });
          } else {
            matchingControl.setErrors(null);
          }
        };*/
      }
}
export function requiredValidator(control: AbstractControl): ValidationErrors|null {
    console.log(control);
    return  {'passwordMatch': true};
  }

function isEmptyInputValue(value: any): boolean {
    /**
     * Check if the object is a string or array before evaluating the length attribute.
     * This avoids falsely rejecting objects that contain a custom length attribute.
     * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
     */
    return value == null ||
        ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
  }