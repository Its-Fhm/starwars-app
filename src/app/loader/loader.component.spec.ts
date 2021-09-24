import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderComponent} from './loader.component';
import {MatProgressSpinnerModule} from '@angular/material';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [LoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const spinner = fixture.debugElement.nativeElement.querySelector('.mat-spinner');
    expect(spinner).toBeDefined();
    expect(component).toBeTruthy();
  });
});
