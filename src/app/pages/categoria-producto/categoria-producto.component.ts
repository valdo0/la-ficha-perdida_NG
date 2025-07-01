import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import Swal from 'sweetalert2';
/**
 * @description
 * CategoriaProductoComponent es un componente de Angular que se encarga de mostrar los productos
 * de una categoría específica. Utiliza el servicio ProductoService para obtener los productos
 * filtrados por categoría y el servicio CarritoService para agregar productos al carrito de compras.
 * Al agregar un producto al carrito, muestra una notificación de éxito utilizando SweetAlert2.
 */
@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
})
/**
 * @description
 * CategoriaProductoComponent es un componente que muestra los productos de una categoría específica.
 * Utiliza el servicio ProductoService para obtener los productos filtrados por categoría.
 * También utiliza el servicio CarritoService para agregar productos al carrito de compras.
 * Al agregar un producto al carrito, muestra una notificación de éxito utilizando SweetAlert2.
 */
export class CategoriaProductoComponent {
  /**
   * @description
   * Lista de productos que pertenecen a la categoría seleccionada.
   * Esta lista se obtiene a través del servicio ProductoService filtrando por el ID de la categoría.
   */
  productos: Producto[] = [];
  /**
   * @description
   * Constructor del componente CategoriaProductoComponent.
   * Inyecta los servicios CarritoService y ProductoService, así como ActivatedRoute para acceder a los parámetros de la ruta.
   * @param carritoService
   * @param productoService
   * @param route
   */
  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}
  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene el ID de la categoría desde los parámetros de la ruta y utiliza el servicio ProductoService
   * para obtener los productos correspondientes a esa categoría.
   * @returns void
   */
  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    this.productos = this.productoService.getProductosByCategoryId(categoryId);
  }
  /**
   * @description
   * Método para agregar un producto al carrito.
   * Muestra una notificación de éxito utilizando SweetAlert2.
   * @param producto - El producto a agregar al carrito.
   */
  agregarAlCarrito(producto: any): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Agregado al carrito',
      text: 'El juego fue agregado correctamente.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    this.carritoService.addItem(producto);
  }
}
