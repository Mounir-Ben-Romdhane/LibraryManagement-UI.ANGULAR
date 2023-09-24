import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {
  categoryForm: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.categoryForm = this.fb.group({
      category: this.fb.control(''),
      subcategory: this.fb.control(''),
    });
  }

  addNewCategory() {
    let c = this.Category.value;
    let s = this.Subcategory.value;

    this.api.insertCategory(c, s).subscribe({
      next: (res: any) => {
        this.msg = res.toString();
        setInterval(() => (this.msg = ''), 5000);
        this.categoryForm.reset();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  get Category(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }
  get Subcategory(): FormControl {
    return this.categoryForm.get('subcategory') as FormControl;
  }
}
