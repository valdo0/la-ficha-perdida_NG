import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoComponent } from './carrito.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      imports:[ComponentsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null
              }
            },
            params: of({}),
            queryParams: of({})
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
