import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpoderDialogComponent } from './superpoder-dialog.component';

describe('HeroiDialogComponent', () => {
  let component: SuperpoderDialogComponent;
  let fixture: ComponentFixture<SuperpoderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperpoderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperpoderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
