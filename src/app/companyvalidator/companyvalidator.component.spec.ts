import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyvalidatorComponent } from './companyvalidator.component';

describe('CompanyvalidatorComponent', () => {
  let component: CompanyvalidatorComponent;
  let fixture: ComponentFixture<CompanyvalidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyvalidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyvalidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
