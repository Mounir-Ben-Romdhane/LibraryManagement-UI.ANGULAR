import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent {
  status: string = '';
  bookForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      bookId: fb.control('', [Validators.required]),
      userId: fb.control('', [Validators.required]),
    });
  }

  returnBook() {
    let book = (this.bookForm.get('bookId') as FormControl).value;
    let user = (this.bookForm.get('userId') as FormControl).value;
    this.api.returnBook(book, user).subscribe({
      next: (res: any) => {
        if (res === 'success') this.status = 'Book Returned!';
        else this.status = res;
        console.log(res);
      },
      error: (err: any) => console.log(err),
    });
  }
}
