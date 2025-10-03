import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/products.service';
import { IProduct } from '../../../types/products';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-editproductdialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './editproductdialog.html',
  styleUrl: './editproductdialog.scss',
})
export class EditProductDialog implements OnInit {
  product$: Observable<IProduct[]> | undefined;
  productName: string = '';

  editProductForm = new FormGroup({
    productUId: new FormControl<number | null>(null, [Validators.required]),
    productCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),

    productName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),
    productDescription: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),
    manufactureCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),
    manufactureName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),
    manufactureDescription: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[\w\s-]+$/),
    ]),
    cartonQty: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    available: new FormControl<boolean | null>(null, [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.product$ = this.productService.getProduct(this.data?.id);
    this.product$.subscribe({
      next: (data) => {
        const product = data[0];
        this.productName = product?.productName || '';
        this.editProductForm.patchValue({
          productUId: product?.productUId,
          productCode: product?.productCode,
          productName: product?.productName,
          productDescription: product?.productDescription,
          manufactureCode: product?.manufactureCode,
          manufactureName: product?.manufactureName,
          manufactureDescription: product?.manufactureDescription,
          cartonQty: product?.cartonQty,
          available: product?.available,
        });
      },
    });
    this.editProductForm.markAllAsTouched();
    this.editProductForm.updateValueAndValidity();
  }

  editProduct() {
    if (this.editProductForm.valid) {
      this.dialogRef.close(this.editProductForm.value);
      this.editProductForm.reset();
    }
  }

  close() {
    this.editProductForm.reset();
    this.dialogRef.close();
  }
}
