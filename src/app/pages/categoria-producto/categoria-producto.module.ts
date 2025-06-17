import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaProductoComponent } from './categoria-producto.component';
import { CategoriaProductoRoutingModule } from './categoria-producto-routing.module';
import { ComponentsModule } from 'src/app/components/layout/components.module';



@NgModule({
  declarations: [
    CategoriaProductoComponent
  ],
  imports: [
    CommonModule,
    CategoriaProductoRoutingModule,
    ComponentsModule
  ]
})
export class CategoriaProductoModule { }
