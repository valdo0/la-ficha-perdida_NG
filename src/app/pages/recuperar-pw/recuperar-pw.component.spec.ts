import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPwComponent } from './recuperar-pw.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecuperarPwComponent', () => {
  let component: RecuperarPwComponent;
  let fixture: ComponentFixture<RecuperarPwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPwComponent],
      imports: [ComponentsModule,ReactiveFormsModule],
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
    fixture = TestBed.createComponent(RecuperarPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
