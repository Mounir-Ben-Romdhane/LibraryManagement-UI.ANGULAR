import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from './models/models';
import { ApiService } from './services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from './services/user-store/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {

  private role: string = "";
  constructor(private api: ApiService,
    private snakBar: MatSnackBar,
    private userStore: UserStoreService) {}

  canActivate():boolean{
    if(this.api.isLoggedIn()){
      this.userStore.getRoleFromStore()
      .subscribe(
        val => {
          let userRoleToken = this.api.getRoleFromToken();
          this.role = val || userRoleToken;
        }
      );
      if(this.role === "Admin"){
        console.log("role"+this.role);
        return true;
      }
      console.log("role"+this.role);
      this.snakBar.open('You are not a Admin','Error',{
        duration: 2000
      });
      return false;
    }else{
      //this.toast.error({detail:"ERROR", summary:"Please login in first !", duration:3000});
      this.snakBar.open('You are not a Admin','Error',{
        duration: 2000
      });
      return false;
    }
  }
}
