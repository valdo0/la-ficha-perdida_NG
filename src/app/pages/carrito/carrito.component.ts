import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { Subscription } from 'rxjs';

/**
 * @description
 * Componente que representa el carrito de compras en la aplicación.
 * Permite a los usuarios ver, modificar y finalizar su compra.
 * Incluye funcionalidades para aumentar, disminuir o eliminar productos del carrito,
 * así como calcular el total de la compra.
 * Utiliza el servicio CarritoService para gestionar el estado del carrito.
 */
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
/**
 * @description
 * Componente que representa el carrito de compras.
 * Maneja la visualización de los productos en el carrito,
 * la cantidad de cada producto, y permite aumentar,
 * disminuir o eliminar productos del carrito.
 * Además, calcula el total de la compra
 * y permite finalizar la compra.
 */
export class CarritoComponent implements OnInit, OnDestroy {
  /**
   * Lista de productos en el carrito.
   * Cada producto contiene información como ID, nombre, precio y cantidad.
   */
  carrito: any[] = [];
  /**
   * Suscripción utilizada para gestionar y limpiar observables en el componente.
   * Se asegura de evitar fugas de memoria al desuscribirse correctamente cuando
   * el componente se destruye.
   */
  private subscription!: Subscription;

  /**
   * @description
   * Constructor del componente CarritoComponent.
   * Inyecta el servicio CarritoService para interactuar con el carrito de compras.
   * @param carritoService - Servicio que maneja la lógica del carrito de compras.
   * Este servicio proporciona métodos para agregar, eliminar y modificar productos en el carrito,
   * así como para obtener el estado actual del carrito.
   */
  constructor(private carritoService: CarritoService) {}

  /**
   * @description
   * Inicializa el componente y se suscribe al observable del carrito
   * para obtener los productos actuales en el carrito.
   * Se ejecuta cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.subscription = this.carritoService.carrito$.subscribe((carrito) => {
      this.carrito = carrito;
    });
  }
  /**
   * @description
   * Destruye la suscripción al observable del carrito
   * para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * @description
   * Aumenta la cantidad de un producto en el carrito.
   * @param id - ID del producto a aumentar.
   */
  aumentarCantidad(id: any): void {
    this.carritoService.increaseQuantity(id);
  }
  /**
   * @description
   * Disminuye la cantidad de un producto en el carrito.
   * Si la cantidad llega a 0, el producto se elimina del carrito.
   * @param id - ID del producto a disminuir.
   */
  disminuirCantidad(id: any): void {
    this.carritoService.decreaseQuantity(id);
  }
  /**
   * @description
   * Elimina un producto del carrito.
   * @param item - Producto a eliminar del carrito.
   */
  eliminarItem(item: any): void {
    this.carritoService.removeItem(item);
  }
  /**
   * @description
   * Calcula el total de la compra sumando el precio de cada producto
   * multiplicado por su cantidad.
   * @returns El total de la compra.
   */
  getTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.price * item.cantidad,
      0
    );
  }
  /**
   * @description
   * Finaliza la compra, limpiando el carrito y realizando cualquier otra acción necesaria.
   */
  finalizarCompra() {
    if (this.carrito.length === 0) return;
    this.carritoService.finalizarCompra();
  }
}
