import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store/user-store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  listOfOrders: Order[] = [];
  columns: string[] = ['name','bookName','orderDate','returned'];
  private userId: number | undefined;

  constructor( private api: ApiService,
    private userStore: UserStoreService ) {}

  ngOnInit(): void {
    this.userStore.getUserIdFromStore()
    .subscribe(
      val => {
        let userIdFromToken = this.api.getUserIdFromToken();
        this.userId = val || userIdFromToken;
      }
    );
    this.api.getOrdersOfUsers(this.userId).subscribe({
      next: (res: Order[]) => {
        console.log(res);
        this.listOfOrders = res;
        console.log(this.listOfOrders);
      },
      error: (err: any) => console.log(err),
    });
  }
}
