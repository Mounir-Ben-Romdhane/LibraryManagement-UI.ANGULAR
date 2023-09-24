import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent {
  addBookForm: FormGroup;
  deleteBookForm: FormControl;

  addMsg: string = '';
  delMsg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.addBookForm = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      category: fb.control('', [Validators.required]),
      price: fb.control('', [Validators.required]),
    });

    this.deleteBookForm = fb.control('', [Validators.required]);
  }

  insertBook() {
    let book = {
      id: 0,
      titre: this.Title.value,
      categoryId: this.Category.value,
      price: this.Price.value,
      available: true,
      auteur: this.Author.value,
    };
     console.log(book);
    this.api.insertBook(book).subscribe({
      next: (res: any) => {
        this.addMsg = 'Book Inserted';
        setInterval(() => (this.addMsg = ''), 5000);
        this.addBookForm.reset();

      },
      error: (err: any) => console.log(err),
    });
  }

  deleteBook() {
    let id: number = parseInt(this.deleteBookForm.value);

    this.api.deleteBook(id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          this.delMsg = 'Book Deleted';
        } else {
          this.delMsg = 'Book not found!';
        }
        setInterval(() => (this.delMsg = ''), 5000);
        this.deleteBookForm.reset();
      },
      error: (err: any) => console.log(err),
    });

  }

  get Title(): FormControl {
    return this.addBookForm.get('title') as FormControl;
  }
  get Author(): FormControl {
    return this.addBookForm.get('author') as FormControl;
  }
  get Category(): FormControl {
    return this.addBookForm.get('category') as FormControl;
  }
  get Subcategory(): FormControl {
    return this.addBookForm.get('subcategory') as FormControl;
  }
  get Price(): FormControl {
    return this.addBookForm.get('price') as FormControl;
  }
}
