import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPwComponent } from './recuperar-pw.component';

describe('RecuperarPwComponent', () => {
  let component: RecuperarPwComponent;
  let fixture: ComponentFixture<RecuperarPwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPwComponent]
    });
    fixture = TestBed.createComponent(RecuperarPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
