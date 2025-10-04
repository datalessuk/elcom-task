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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-editproductdialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FormTemplate,
    MatProgressSpinnerModule,
  ],
  standalone: true,
  templateUrl: './editproductdialog.html',
  styleUrl: './editproductdialog.scss',
})
export class EditProductDialog implements OnInit {
  product$: Observable<IProduct[]> | undefined;
  productName: string = '';
  editProductForm = new FormGroup({});
  loading: boolean = true;
  productFound: boolean = true;

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
    this.loading = true;
    this.product$ = this.productService.getProduct(this.data?.id);

    this.product$.subscribe({
      next: (data) => {
        if (data && data.length > 0) {
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
          this.productFound = true;
          //if no product found it returns empty array
        } else {
          this.productFound = false;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(`Something went wrong`, err);
        this.loading = false;
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
