import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
      imports: [ComponentsModule,FormsModule,ReactiveFormsModule,HttpClientTestingModule],
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
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
