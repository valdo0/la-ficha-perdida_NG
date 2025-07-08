import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
/**
 * @description
 * HomeComponent es el componente principal de la aplicación.
 * Se encarga de inicializar las categorías y manejar la navegación dentro de la aplicación.
 * Utiliza el servicio CategoriaService para obtener las categorías disponibles.
 * También maneja el desplazamiento a fragmentos específicos de la página cuando se navega a través de rutas con fragmentos.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
/**
 * @description
 * HomeComponent es el componente principal de la aplicación.
 * Se encarga de inicializar las categorías y manejar la navegación dentro de la aplicación.
 * Utiliza el servicio CategoriaService para obtener las categorías disponibles.
 * También maneja el desplazamiento a fragmentos específicos de la página cuando se navega a través de rutas con fragmentos.
 */
export class HomeComponent implements OnInit {
  /**
   * @description
   * Lista de categorías disponibles en la aplicación.
   * Esta lista se obtiene a través del servicio CategoriaService.
   * @type {Categoria[]}
   */
  categorias: Categoria[] = [];
  /**
   * @description
   * Constructor del componente HomeComponent.
   * Inicializa el componente con los servicios necesarios para la navegación y el manejo de categorías.
   * @param router
   * @param route
   * @param viewportScroller
   * @param categoriasService
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private categoriasService: CategoriaService
  ) {}
  /**
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Obtiene las categorías disponibles a través del servicio CategoriaService
   * y configura un suscriptor para manejar el desplazamiento a fragmentos específicos de la página
   * cuando se navega a través de rutas con fragmentos.
   */
  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          setTimeout(() => this.viewportScroller.scrollToAnchor(fragment), 100);
        }
      });
  }
}
