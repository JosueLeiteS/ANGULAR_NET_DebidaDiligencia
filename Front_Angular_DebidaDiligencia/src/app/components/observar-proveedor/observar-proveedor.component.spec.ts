import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservarProveedorComponent } from './observar-proveedor.component';

describe('ObservarProveedorComponent', () => {
  let component: ObservarProveedorComponent;
  let fixture: ComponentFixture<ObservarProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservarProveedorComponent]
    });
    fixture = TestBed.createComponent(ObservarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
