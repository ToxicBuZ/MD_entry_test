import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexApplicationComponent } from './forex-application.component';

describe('ForexApplicationComponent', () => {
  let component: ForexApplicationComponent;
  let fixture: ComponentFixture<ForexApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
