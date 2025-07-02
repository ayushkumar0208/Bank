import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwEmployeeComponent } from './veiw-employee.component';

describe('VeiwEmployeeComponent', () => {
  let component: VeiwEmployeeComponent;
  let fixture: ComponentFixture<VeiwEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
