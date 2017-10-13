import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicTestComponent } from './clinic-test.component';

describe('ClinicTestComponent', () => {
  let component: ClinicTestComponent;
  let fixture: ComponentFixture<ClinicTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
