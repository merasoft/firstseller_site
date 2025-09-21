import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDealsComponent } from './super-deals.component';

describe('SuperDealsComponent', () => {
  let component: SuperDealsComponent;
  let fixture: ComponentFixture<SuperDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperDealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
