import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
private claims$ = new BehaviorSubject<string>("");
private userId$ = new BehaviorSubject<string>("");
private blocked$ = new BehaviorSubject<string>("");
private isActive$ = new BehaviorSubject<string>("");

constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.role$.next(role);
  }


  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullname:string){
    this.fullName$.next(fullname);
  }

  public getClaimsFromStore(){
    return this.claims$.asObservable();
  }

  public setClaimsFromStore(claims:string){
    this.claims$.next(claims);
  }

  public getUserIdFromStore(){
    return this.userId$.asObservable();
  }

  public setUserIdFromStore(userId:string){
    this.userId$.next(userId);
  }

  public getBLockedFromStore(){
    return this.blocked$.asObservable();
  }

  public setBlockedFromStore(blocked:string){
    this.blocked$.next(blocked);
  }

  public getIsActiveFromStore(){
    return this.isActive$.asObservable();
  }

  public setIsActiveFromStore(isActive:string){
    this.isActive$.next(isActive);
  }
}
