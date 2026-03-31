import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvtComponent } from './create-evt.component';

describe('CreateEvtComponent', () => {
  let component: CreateEvtComponent;
  let fixture: ComponentFixture<CreateEvtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEvtComponent]
    });
    fixture = TestBed.createComponent(CreateEvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
