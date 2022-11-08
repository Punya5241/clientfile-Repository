import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsmodelComponent } from './studentsmodel.component';

describe('StudentsmodelComponent', () => {
  let component: StudentsmodelComponent;
  let fixture: ComponentFixture<StudentsmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
