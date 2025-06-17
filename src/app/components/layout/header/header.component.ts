import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  seccionActiva: string = '';
  usuario:any=null;
  private seccionPendiente: string | null = null;

  constructor(private router: Router, private authService : AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.seccionPendiente) {
          this.hacerScroll(this.seccionPendiente);
          this.seccionPendiente = null;
        }
      });
  }

  ngOnInit():void{
    this.usuario= this.authService.getSesion();
  }

  get isAdmin():boolean{
    return this.authService.isAdmin();
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  irAContacto(event: Event) {
    event.preventDefault();
    this.irASeccion('contacto');
  }
  logout(){
    this.authService.logout();
  }
  irAJuegos(event: Event) {
    event.preventDefault();
    this.irASeccion('juegos');
  }
  irANovedades(event: Event) {
    event.preventDefault();
    this.irASeccion('novedades');
  }
  private irASeccion(id: string) {
    if (this.router.url === '/') {
      this.hacerScroll(id);
    } else {
      this.seccionPendiente = id;
      this.router.navigate(['/']);
    }
  }

  private hacerScroll(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
