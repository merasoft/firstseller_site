import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitProductsComponent } from './hit-products.component';

describe('HitProductsComponent', () => {
  let component: HitProductsComponent;
  let fixture: ComponentFixture<HitProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
