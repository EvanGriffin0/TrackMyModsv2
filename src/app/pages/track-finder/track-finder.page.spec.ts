import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackFinderPage } from './track-finder.page';

describe('TrackFinderPage', () => {
  let component: TrackFinderPage;
  let fixture: ComponentFixture<TrackFinderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackFinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
