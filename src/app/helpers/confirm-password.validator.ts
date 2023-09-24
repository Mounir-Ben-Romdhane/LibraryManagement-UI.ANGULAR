import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidators(controlName: string, matchControlName: string){
   return (formGroup:FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchControlName];
    if(confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidators']){
      return;
    }
    if(passwordControl.value !== confirmPasswordControl.value){
      confirmPasswordControl.setErrors({ confirmPasswordValidators : true })
    }else{
      confirmPasswordControl.setErrors(null);
    }
   }
}
