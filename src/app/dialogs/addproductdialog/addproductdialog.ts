import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormService } from '../../../services/form.service';

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
  productForm = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<AddProductDialog>,
    private formService: FormService
  ) {
    this.productForm = this.formService.productForm();
  }

  close(): void {
    this.dialogRef.close();
    this.productForm.reset();
  }

  addProduct() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
      this.productForm.reset();
    }
  }
}
