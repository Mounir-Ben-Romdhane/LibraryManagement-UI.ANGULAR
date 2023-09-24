import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User, UserType } from '../models/models';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import ValidateForm from '../helpers/validateform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideRP = true;
  responseMsg: string = '';
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private api: ApiService,
    private snakBar: MatSnackBar,
    private router: Router) {


  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: this.fb.control('', [Validators.required]),
        lastName: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        username: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ]),
        rpassword: this.fb.control(''),
      },
      {
        validators: [repeatPasswordValidator],
      } as AbstractControlOptions
    );
  }

  register(){
    if(this.registerForm.valid){
    let user: any = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };
    // Sing Up
    this.api.signUp(user).subscribe(
      (seccussRes) => {
        console.log(user);
        this.registerForm.reset();
        this.responseMsg = seccussRes.toString();
        this.snakBar.open('Account created successfully','Done',{
          duration: 2000
        });
        this.router.navigateByUrl('login');
        /*
        this.toast.success({detail:"SUCCESS", summary:"Account created successfully !", duration:3000});
        this.router.navigateByUrl('login');*/
      },
      (errorRes) => {
        console.log(errorRes);
        console.log(user);
        /*this.toast.error({detail:"ERROR", summary:errorRes.error, duration:3000});*/
        this.snakBar.open(errorRes.error,'Error',{
          duration: 2000
        });
      }
    );

  }else{
    // Throw the error using toester and with required file

    ValidateForm.validateAllFormFields(this.registerForm);
    /*this.toast.error({detail:"ERROR", summary:"Your form is invalid !", duration:2000});*/
    this.snakBar.open("Your form is invalid !",'Error',{
      duration: 2000
    });
  }
  }

  getFirstNameErrors() {
    if (this.FirstName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getLastNameErrors() {
    if (this.LastName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getUserNameErrors() {
    if (this.Username.hasError('required')) return 'Field is requied!';
    return '';
  }
  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get Username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPassword(): FormControl {
    return this.registerForm.get('rpassword') as FormControl;
  }
}

export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const pwd = control.get('password')?.value;
  const rpwd = control.get('rpassword')?.value;
  if (pwd === rpwd) {
    control.get('rpassword')?.setErrors(null);
    return null;
  } else {
    control.get('rpassword')?.setErrors({ rpassword: true });
    return { rpassword: true };
  }
};
