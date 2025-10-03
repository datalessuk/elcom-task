import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'addproductdialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './addproductdialog.html',
  styleUrl: './addproductdialog.scss',
})
export class AddProductDialog {
  constructor(private dialogRef: MatDialogRef<AddProductDialog>) {}

  productForm = new FormGroup({
    // productUId: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^[0-9]*$'),
    // ]),
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

  close(): void {
    this.dialogRef.close();
  }

  addProduct() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
