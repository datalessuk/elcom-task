import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProducts } from '../types/products';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //private url = 'http://test.evolve-s2p.com/CRUDExample/';
  private url = '/api/CRUDExample';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${this.url}/get-products`);
  }

  getProduct(productUId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/get-product`, {
      params: { ProductUId: productUId },
    });
  }

  addProduct(product: IProduct): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/add-product`, product);
  }

  editProduct(product: IProduct): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/edit-product`, product);
  }

  deleteProduct(productUId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/remove-product`, {
      params: { ProductUId: productUId },
    });
  }
}
