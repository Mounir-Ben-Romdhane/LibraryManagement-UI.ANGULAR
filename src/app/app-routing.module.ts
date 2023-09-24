import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthorizationGuard } from './authorization.guard';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ManageBookComponent } from './manage-book/manage-book.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';

const routes: Routes = [
  {
    path: 'books/library',
    component: LibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users/my-orders',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/all-orders',
    component: OrdersComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'books/return',
    component: ReturnBookComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'users/list',
    component: UsersListComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'books/maintenance',
    component: ManageBookComponent,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'books/categories',
    component: ManageCategoriesComponent,
    canActivate: [AuthorizationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
