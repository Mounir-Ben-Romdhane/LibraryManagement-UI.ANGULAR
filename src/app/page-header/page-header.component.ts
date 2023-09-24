import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit{

  public fullName : string ="";
  private userId: string = "";

  constructor(private api: ApiService,
    private userStore: UserStoreService,
    private router: Router){}
  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
  .subscribe(
    val => {
      let fullNameFromToken = this.api.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
      console.log("fullName",this.fullName);
    }
  );
  this.userStore.getUserIdFromStore()
    .subscribe(
      val => {
        let userIdFromToken = this.api.getUserIdFromToken();
        this.userId = val || userIdFromToken;
        console.log("userId",this.userId);
      }
    );
  }

  @Output() menuClicked = new EventEmitter<boolean>();

  logout(){
    this.api.signOut();
    this.router.navigateByUrl('');
  }

}


