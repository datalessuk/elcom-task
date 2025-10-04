import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formtemplate } from './formtemplate';

describe('Formtemplate', () => {
  let component: Formtemplate;
  let fixture: ComponentFixture<Formtemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formtemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formtemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
