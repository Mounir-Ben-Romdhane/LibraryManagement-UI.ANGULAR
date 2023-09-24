import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from '../services/user-store/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  hideRP = true;
  loginForm!: FormGroup;
  responseMsh: string = '';

  constructor(private fb: FormBuilder,
    private api: ApiService,
    private snakBar: MatSnackBar,
    private userStore: UserStoreService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
    })
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.api.login(this.loginForm.value).subscribe(
      (seccussRes) => {
        /*this.snakBar.open('Login successfully','Done',{
          duration: 2000
        });*/
          this.loginForm.reset();
          this.api.storeToken(seccussRes.accessToken);
          this.api.storeRefreshToken(seccussRes.refreshToken);
          const tokenPayload = this.api.decodeToken();


          if(tokenPayload.isActive =="True") {
            this.router.navigateByUrl('books/library');
            this.responseMsh = 'Login Succes';
            this.userStore.setFullNameFromStore(tokenPayload.unique_name);
          this.userStore.setRoleFromStore(tokenPayload.role);
          this.userStore.setClaimsFromStore(tokenPayload.myClaims);
          this.userStore.setUserIdFromStore(tokenPayload.userId);
          this.userStore.setBlockedFromStore(tokenPayload.blocked);
          this.userStore.setIsActiveFromStore(tokenPayload.isActive);
          }else{
            this.responseMsh = 'You are not active!';
            this.api.signOutt();
          }
        console.log(seccussRes);
      },
      (errorRes) => {
        console.log(errorRes);
        this.responseMsh = 'Invalid Credentials!';
        this.snakBar.open(errorRes.error.message,'Error',{
          duration: 2000
        });
        console.log(this.loginForm.value);
      }
    );
  }

  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('username')) return 'Email is invalid.';
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

  get Email(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

}
