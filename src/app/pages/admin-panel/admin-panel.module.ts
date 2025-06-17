import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule
 } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { ComponentsModule } from 'src/app/components/layout/components.module';


@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ComponentsModule
  ]
})
export class AdminPanelModule { }
