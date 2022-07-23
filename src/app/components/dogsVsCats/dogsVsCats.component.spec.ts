/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DogsVsCatsComponent } from './dogsVsCats.component';

describe('DogsVsCatsComponent', () => {
  let component: DogsVsCatsComponent;
  let fixture: ComponentFixture<DogsVsCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogsVsCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogsVsCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
