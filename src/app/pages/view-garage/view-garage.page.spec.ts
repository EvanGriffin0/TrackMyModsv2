import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewGaragePage } from './view-garage.page';

describe('ViewGaragePage', () => {
  let component: ViewGaragePage;
  let fixture: ComponentFixture<ViewGaragePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGaragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
