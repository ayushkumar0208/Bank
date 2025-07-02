import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSessionComponent } from './no-session.component';

describe('NoSessionComponent', () => {
  let component: NoSessionComponent;
  let fixture: ComponentFixture<NoSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
