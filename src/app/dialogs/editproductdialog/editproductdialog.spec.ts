import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDialog } from './editproductdialog';

describe('Editproductdialog', () => {
  let component: EditProductDialog;
  let fixture: ComponentFixture<EditProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
