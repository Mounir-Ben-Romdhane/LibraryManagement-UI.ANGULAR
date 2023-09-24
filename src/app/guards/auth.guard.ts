import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: ApiService,
    private router: Router,
    private snakBar: MatSnackBar){}

  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      //this.router.navigateByUrl('Students');
      return true;
    }else{
      //this.toast.error({detail:"ERROR", summary:"Please login in first !", duration:3000});
      this.snakBar.open('Please log in','Error',{
        duration: 2000
      });
      this.router.navigateByUrl('login');
      return false;
    }
  }


}

