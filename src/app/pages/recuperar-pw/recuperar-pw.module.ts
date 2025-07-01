import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperarPwRoutingModule } from './recuperar-pw-routing.module';
import { RecuperarPwComponent } from './recuperar-pw.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecuperarPwComponent
  ],
  imports: [
    CommonModule,
    RecuperarPwRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class RecuperarPwModule { }
