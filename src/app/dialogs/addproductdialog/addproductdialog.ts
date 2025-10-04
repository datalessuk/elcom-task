import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { FormTemplate } from '../../form/formtemplate/formtemplate';

@Component({
  selector: 'addproductdialog',
  imports: [MatDialogModule, ReactiveFormsModule, FormTemplate],
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
