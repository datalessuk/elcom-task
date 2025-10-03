import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { startWith, Subject, switchMap } from 'rxjs';
import { IProduct, IProducts } from '../../types/products';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductDialog } from '../dialogs/addproductdialog/addproductdialog';
import { DeleteProductDialog } from '../dialogs/deleteproductdialog/deleteproductdialog';
import { EditProductDialog } from '../dialogs/editproductdialog/editproductdialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  templateUrl: './task.html',
  standalone: true,
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<IProducts>();
  private _snackBar = inject(MatSnackBar);
  private refreshTrigger$ = new Subject<void>();
  displayedColumns: string[] = [
    'productUId',
    'productCode',
    'productName',
    'productDescription',
    'manufactureCode',
    'manufactureName',
    'manufactureDescription',
    'cartonQty',
    'available',
    'remove',
    'edit',
  ];

  columnNames: { [key: string]: string } = {
    productUId: 'Product UId',
    productCode: 'Product Code',
    productName: 'Product Name',
    productDescription: 'Product Description',
    manufactureCode: 'Manufacture Code',
    manufactureName: 'Manufacture Name',
    manufactureDescription: 'Manufacture Description',
    cartonQty: 'Carton Qty',
    available: 'Available',
    remove: 'Remove',
    edit: 'Edit',
  };

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refreshTrigger$
      .pipe(
        startWith(null),
        switchMap(() => this.productService.getProducts())
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.refreshTrigger$.complete();
  }

  refreshProducts() {
    this.refreshTrigger$.next();
  }

  removeProduct(productUId: number, productName: string) {
    if (!productUId || !productName) {
      return;
    }
    let dialogRef = this.dialog.open(DeleteProductDialog, {
      width: '600px',
      data: { name: productName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(productUId).subscribe({
          next: (res: boolean) => {
            if (res) {
              this._snackBar.open(`Deleted product: ${productUId}`, 'Close', {
                duration: 3000,
              });
              this.refreshProducts();
            }
          },
          error: (err) => {
            console.error('something went wrong', err);
            this._snackBar.open(
              'Did not delete product, please try again',
              'Close',
              { duration: 3000 }
            );
          },
        });
      }
    });
  }

  addProduct(): void {
    let dialogRef = this.dialog.open(AddProductDialog, {
      height: 'auto',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const request: IProduct = {
          ...result,
          cartonQty: Number(result.cartonQty),
          available: Boolean(result.available),
        };

        this.productService.addProduct(request).subscribe({
          next: (res: boolean) => {
            if (res)
              this._snackBar.open('Added new product', 'Close', {
                duration: 3000,
              });
            this.refreshProducts();
          },
          error: (err) => {
            console.error('something went wrong', err);
            this._snackBar.open(
              'Did not add product, please try again',
              'Close',
              { duration: 3000 }
            );
          },
        });
      }
    });
  }

  editProduct(productUId: number) {
    let dialogRef = this.dialog.open(EditProductDialog, {
      height: 'auto',
      width: '600px',
      data: { id: productUId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const request: IProduct = {
          ...result,
          cartonQty: Number(result.cartonQty),
          available: Boolean(result.available),
        };
        this.productService.editProduct(request).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.refreshProducts();
              this._snackBar.open(`Edited ${request?.productName}`, 'Close', {
                duration: 3000,
              });
            }
          },
          error: (err) => {
            console.error('something went wrong', err);
            this._snackBar.open(
              'Did not edit product, please try again',
              'Close',
              { duration: 3000 }
            );
          },
        });
      }
    });
  }
}
