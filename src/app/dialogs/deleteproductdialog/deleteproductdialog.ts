import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deleteproductdialog',
  imports: [MatDialogModule, MatButtonModule],
  standalone: true,
  templateUrl: './deleteproductdialog.html',
  styleUrl: './deleteproductdialog.scss',
})
export class DeleteProductDialog {
  constructor(
    private dialogRef: MatDialogRef<DeleteProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  removeProduct(): void {
    this.dialogRef.close(true);
  }
}
