import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store/user-store.service';
import { User } from '../models/models';
import { LibraryComponent } from '../library/library.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  users: User[] = [];
  columnsToDisplay: string[] = [
    'name',
    'userName',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'createdOn',
    'role',
    'action',
  ];
  public role!:string;

  constructor(private api: ApiService,
    private userStore: UserStoreService){}


  ngOnInit(): void {
    this.userStore.getRoleFromStore()
        .subscribe(val => {
          const roleFromToken = this.api.getRoleFromToken();
          this.role = val || roleFromToken;
        });

    this.api.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = [];
        this.users = res;
        console.log(res);
        console.log(this.users);
      },
      error: (err: any) => console.log(err),
    });
  }

  blockUser(user: User) {
    if (user.blocked) {
      this.api.unblockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
      this.api.blockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  enableUser(user: User) {
    if (user.active) {
      this.api.disableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
       this.api.enableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }

}
