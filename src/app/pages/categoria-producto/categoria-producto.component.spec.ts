import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProductoComponent } from './categoria-producto.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoriaProductoComponent', () => {
  let component: CategoriaProductoComponent;
  let fixture: ComponentFixture<CategoriaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaProductoComponent],
      imports: [ComponentsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
            },
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
