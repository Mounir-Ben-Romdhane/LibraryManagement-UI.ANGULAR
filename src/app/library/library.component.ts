import { Component, OnInit } from '@angular/core';
import { Book, CategoryBooks } from '../models/models';
import { ApiService } from '../services/api.service';
import { UserStoreService } from '../services/user-store/user-store.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit{

  availableBooks: Book[] = [];
  booksToDisplay: CategoryBooks[] = [];
  displayedColumns: string[] = [
    'titre',
    'auteur',
    'price',
    'available',
    'order',
  ];
  private userId: number | undefined;
  public blocked!:string;

  constructor(private api: ApiService,
    private userStore: UserStoreService){}

  ngOnInit(): void {

    this.userStore.getBLockedFromStore()
        .subscribe(val => {
          const blockedFromToken = this.api.getBlockedFromToken();
          this.blocked = val || blockedFromToken;
        });
    console.log("blocked : "+this.blocked);

    this.api.getAllBooks().subscribe({
      next: (res: Book[]) => {
        this.availableBooks = [];
        console.log(res);
        for(var book of res ) this.availableBooks.push(book);
        this.updateList();
      },
      error: (err: any ) => console.log(err),
    });
  }

  updateList() {
    this.booksToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let categoryBooks of this.booksToDisplay) {
        if (
          book.libelle === categoryBooks.libelle &&
          book.subCategory === categoryBooks.subCategory
        )
          exist = true;
      }

      if (exist) {
        for (let categoryBooks of this.booksToDisplay) {
          if (
            book.libelle === categoryBooks.libelle &&
            book.subCategory === categoryBooks.subCategory
          )
            categoryBooks.books.push(book);
        }
      } else {
        this.booksToDisplay.push({
          libelle: book.libelle,
          subCategory: book.subCategory,
          books: [book],
        });
      }
    }
  }

  getBooksCount(){
    return this.booksToDisplay.reduce((pv,cv) => cv.books.length + pv ,0);
  }

  search(value: string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.booksToDisplay = this.booksToDisplay.filter((categoryBooks) => {
        categoryBooks.books = categoryBooks.books.filter(
          (book) =>
            book.titre.toLowerCase().includes(value) ||
            book.auteur.toLowerCase().includes(value)
        );
        return categoryBooks.books.length > 0;
      });
    }
  }

  orderBook(book: Book) {
    this.userStore.getUserIdFromStore()
    .subscribe(
      val => {
        let userIdFromToken = this.api.getUserIdFromToken();
        this.userId = val || userIdFromToken;
      }
    );
    console.log(this.userId);
    console.log(book.id);
    this.api.orderBook(this.userId, book.id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          book.available = false;
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  isBlocked() {
    let blocked = this.api.getBlockedFromToken();
    return blocked;
  }

}
