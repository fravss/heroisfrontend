import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroisTableComponent } from './herois-table.component';

describe('HeroisTableComponent', () => {
  let component: HeroisTableComponent;
  let fixture: ComponentFixture<HeroisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroisTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
