import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProductDialog } from './addproductdialog';

fdescribe('AddProductDialog', () => {
  let component: AddProductDialog;
  let fixture: ComponentFixture<AddProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductDialog, ReactiveFormsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with all controls', () => {
    expect(component.productForm.contains('productCode')).toBeTrue();
    expect(component.productForm.contains('productName')).toBeTrue();
    expect(component.productForm.contains('productDescription')).toBeTrue();
    expect(component.productForm.contains('manufactureCode')).toBeTrue();
    expect(component.productForm.contains('manufactureName')).toBeTrue();
    expect(component.productForm.contains('manufactureDescription')).toBeTrue();
    expect(component.productForm.contains('cartonQty')).toBeTrue();
    expect(component.productForm.contains('available')).toBeTrue();
  });

  it('should validate productCode: required and maxLength 100', () => {
    const control = component.productForm.get('productCode');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();

    const longValue = 'A'.repeat(101);
    control?.setValue(longValue);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['maxlength']).toBeTruthy();
    expect(control?.errors?.['maxlength'].requiredLength).toBe(100);
    expect(control?.errors?.['maxlength'].actualLength).toBe(101);

    control?.setValue('BA03!');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    const maxLengthValue = 'A'.repeat(100);
    control?.setValue(maxLengthValue);
    expect(control?.valid).toBeTrue();
  });

  it('should validate product name: required and maxLength 100', () => {
    const control = component.productForm.get('productName');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();

    const longValue = 'A'.repeat(101);
    control?.setValue(longValue);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['maxlength']).toBeTruthy();
    expect(control?.errors?.['maxlength'].requiredLength).toBe(100);
    expect(control?.errors?.['maxlength'].actualLength).toBe(101);

    control?.setValue('BA03!');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    const maxLengthValue = 'A'.repeat(100);
    control?.setValue(maxLengthValue);
    expect(control?.valid).toBeTrue();
  });

  it('should validate product description: required and maxLength 100', () => {
    const control = component.productForm.get('productDescription');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();

    const longValue = 'A'.repeat(101);
    control?.setValue(longValue);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['maxlength']).toBeTruthy();
    expect(control?.errors?.['maxlength'].requiredLength).toBe(100);
    expect(control?.errors?.['maxlength'].actualLength).toBe(101);

    control?.setValue('BA03!');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    const maxLengthValue = 'A'.repeat(100);
    control?.setValue(maxLengthValue);
    expect(control?.valid).toBeTrue();
  });

  it('should validate manufacture code: required and maxLength 100', () => {
    const control = component.productForm.get('manufactureCode');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();

    const longValue = 'A'.repeat(101);
    control?.setValue(longValue);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['maxlength']).toBeTruthy();
    expect(control?.errors?.['maxlength'].requiredLength).toBe(100);
    expect(control?.errors?.['maxlength'].actualLength).toBe(101);

    control?.setValue('BA03!');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    const maxLengthValue = 'A'.repeat(100);
    control?.setValue(maxLengthValue);
    expect(control?.valid).toBeTrue();
  });

  it('should validate manufacture description: required and maxLength 100', () => {
    const control = component.productForm.get('manufactureDescription');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();

    const longValue = 'A'.repeat(101);
    control?.setValue(longValue);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['maxlength']).toBeTruthy();
    expect(control?.errors?.['maxlength'].requiredLength).toBe(100);
    expect(control?.errors?.['maxlength'].actualLength).toBe(101);

    control?.setValue('BA03!');
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('BA03');
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    const maxLengthValue = 'A'.repeat(100);
    control?.setValue(maxLengthValue);
    expect(control?.valid).toBeTrue();
  });

  it('should validate carton qty: required and numeric only', () => {
    const control = component.productForm.get('cartonQty');

    control?.setValue(null);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue(50);
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    control?.setValue('abc' as any);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();

    control?.setValue('12a' as any);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['pattern']).toBeTruthy();
  });

  it('should validate available: required', () => {
    const control = component.productForm.get('available');

    control?.setValue(null);
    expect(control?.valid).toBeFalse();
    expect(control?.errors?.['required']).toBeTrue();

    control?.setValue(true);
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();

    control?.setValue(false);
    expect(control?.valid).toBeTrue();
    expect(control?.errors).toBeNull();
  });
});
