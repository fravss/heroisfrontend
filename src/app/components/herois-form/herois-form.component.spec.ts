import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroisFormComponent } from './herois-form.component';

describe('HeroisFormComponent', () => {
  let component: HeroisFormComponent;
  let fixture: ComponentFixture<HeroisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
