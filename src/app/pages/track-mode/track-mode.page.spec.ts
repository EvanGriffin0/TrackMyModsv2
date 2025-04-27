import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackModePage } from './track-mode.page';

describe('TrackModePage', () => {
  let component: TrackModePage;
  let fixture: ComponentFixture<TrackModePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
