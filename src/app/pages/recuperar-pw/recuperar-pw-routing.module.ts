import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarPwComponent } from './recuperar-pw.component';

const routes: Routes = [{ path: '', component: RecuperarPwComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarPwRoutingModule { }
