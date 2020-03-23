import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapV2Component } from './map-v2.component';

describe('MapV2Component', () => {
  let component: MapV2Component;
  let fixture: ComponentFixture<MapV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
