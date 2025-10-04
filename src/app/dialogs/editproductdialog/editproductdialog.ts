import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/products.service';
import { IProduct } from '../../../types/products';
import { Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { FormTemplate } from '../../form/formtemplate/formtemplate';

@Component({
  selector: 'app-editproductdialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FormTemplate,
  ],
  standalone: true,
  templateUrl: './editproductdialog.html',
  styleUrl: './editproductdialog.scss',
})
export class EditProductDialog implements OnInit {
  product$: Observable<IProduct[]> | undefined;
  productName: string = '';
  editProductForm = new FormGroup({});
  loading = false;

  constructor(
    private productService: ProductService,
    private formService: FormService,
    private dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.editProductForm = this.formService.productForm();
  }

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
