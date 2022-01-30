import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedDetailsComponent } from './advanced-details.component';

describe('AdvancedDetailsComponent', () => {
  let component: AdvancedDetailsComponent;
  let fixture: ComponentFixture<AdvancedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
