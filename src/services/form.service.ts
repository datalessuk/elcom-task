import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  productForm(): FormGroup {
    return new FormGroup({
      productUId: new FormControl<number | null>(null),
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
  }
}
