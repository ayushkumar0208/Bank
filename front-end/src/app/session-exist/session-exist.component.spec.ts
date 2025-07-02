import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExistComponent } from './session-exist.component';

describe('SessionExistComponent', () => {
  let component: SessionExistComponent;
  let fixture: ComponentFixture<SessionExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionExistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
