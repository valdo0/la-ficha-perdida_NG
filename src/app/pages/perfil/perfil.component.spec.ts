import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    component.perfilData = {
      nombre: 'Juan',
      email: 'juan@example.com',
      direccion: 'Calle Falsa 123'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
