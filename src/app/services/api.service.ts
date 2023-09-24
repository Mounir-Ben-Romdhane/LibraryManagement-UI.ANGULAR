import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Book, Category, Order, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string= 'https://localhost:44306';
  private userPayload:any;

  constructor(private http: HttpClient,
    private router: Router) {
      this.userPayload = this.decodeToken();
    }

  signUp(userObj: any){
    return this.http.post<any>(this.baseUrl + "/User/register",userObj);
  }

  login(loginOnj: any){
    return this.http.post<any>(this.baseUrl + "/User/authenticate",loginOnj);
  }

  signOut(){
    localStorage.clear();
    this.router.navigateByUrl('login');
    localStorage.removeItem('token');
    location.reload();
  }

  signOutt(){
    localStorage.clear();
    localStorage.removeItem('token');
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken',tokenValue);
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }

  getClaimsFromToken(){
    if(this.userPayload)
      return this.userPayload.myClaims;
  }

  getUserIdFromToken(){
    if(this.userPayload)
      return this.userPayload.userId;
  }

  getBlockedFromToken(){
    if(this.userPayload)
      return this.userPayload.blocked;
  }

  getIsActiveFromToken(){
    if(this.userPayload)
      return this.userPayload.isActive;
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(this.baseUrl + "/User/refresh",tokenApi);
  }

  getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl + "/Livre/GetAllBooks");
  }

  orderBook(userId: any, bookId: number) {
    return this.http.get(this.baseUrl + '/Livre/OrderBook/' + userId + '/' + bookId , {
      responseType: 'text',
    });
  }

  getOrdersOfUsers(userId: any) {
    return this.http.get<Order[]>(this.baseUrl + "/Livre/GetOrders/"+userId);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl + "/Livre/GetAllOrders");
  }

  returnBook(bookId: number, userId: number) {
    return this.http.get(this.baseUrl + '/Livre/ReturnBook/' + bookId + '/' + userId , {
      responseType: 'text',
    });
  }

  getAllUsers(){
    return this.http.get<User[]>(this.baseUrl+ '/AllUsers');
  }

  blockUser(id: number) {
    return this.http.get(this.baseUrl + '/User/ChangeBlockStatus/1/' + id, {
      responseType: 'text',
    });
  }

  unblockUser(id: number) {
    return this.http.get(this.baseUrl + '/User/ChangeBlockStatus/0/' + id, {
      responseType: 'text',
    });
  }

  enableUser(id: number) {
    return this.http.get(this.baseUrl + '/User/ChangeEnableStatus/1/' + id, {
      responseType: 'text',
    });
  }

  disableUser(id: number) {
    return this.http.get(this.baseUrl + '/User/ChangeEnableStatus/0/' + id, {
      responseType: 'text',
    });
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + '/GetAllCategories');
  }

  insertBook(book: any) {
    return this.http.post<any>(this.baseUrl + '/Livre/InsertBook', book);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + '/DeleteBook/' + id, {
      responseType: 'text',
    });
  }

  insertCategory(category: string, subcategory: string) {
    return this.http.post(
      this.baseUrl + '/Livre/InsertCategory',
      { libelle: category, subCategory: subcategory },
      { responseType: 'text' }
    );
  }

}
