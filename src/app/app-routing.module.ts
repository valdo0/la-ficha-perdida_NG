import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard} from './guards/no-auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'carrito',
    canActivate:[authGuard],
    loadChildren: () =>
      import('./pages/carrito/carrito.module').then((m) => m.CarritoModule),
  },
  {
    path: 'login',
    canActivate:[noAuthGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registro',
    canActivate:[noAuthGuard],
    loadChildren: () =>
      import('./pages/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'perfil',
    canActivate:[authGuard],
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: 'recuperar-pw',
    loadChildren: () =>
      import('./pages/recuperar-pw/recuperar-pw.module').then(
        (m) => m.RecuperarPwModule
      ),
  },
  {
    path:'productos/:categoryId',
    loadChildren:()=>
      import ('./pages/categoria-producto/categoria-producto.module').then(
        (m) => m.CategoriaProductoModule
      )
  },
  { path: 'admin', 
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
