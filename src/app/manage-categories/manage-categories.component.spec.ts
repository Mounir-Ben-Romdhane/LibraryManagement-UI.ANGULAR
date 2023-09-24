import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesComponent } from './manage-categories.component';

describe('ManageCategoriesComponent', () => {
  let component: ManageCategoriesComponent;
  let fixture: ComponentFixture<ManageCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoriesComponent]
    });
    fixture = TestBed.createComponent(ManageCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
