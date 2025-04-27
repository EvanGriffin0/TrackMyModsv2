import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationsPage } from './modifications.page';

describe('ModificationsPage', () => {
  let component: ModificationsPage;
  let fixture: ComponentFixture<ModificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
