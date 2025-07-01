import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * @file CarritoService
 * @description
 * Servicio para manejar el carrito de compras del usuario.
 * Permite agregar, eliminar y modificar productos en el carrito,
 * así como finalizar la compra y guardar el estado del carrito en localStorage.
 * Utiliza un BehaviorSubject para mantener el estado del carrito reactivo.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @description
 * Servicio para manejar el carrito de compras del usuario.
 * Permite agregar, eliminar y modificar productos en el carrito,
 * así como finalizar la compra y guardar el estado del carrito en localStorage.
 * Utiliza un BehaviorSubject para mantener el estado del carrito reactivo.
 */
export class CarritoService {
  /** 
   * @description
   * BehaviorSubject que almacena el estado del carrito.
   * Permite a los componentes suscribirse para recibir actualizaciones del carrito.
   * Inicialmente se carga el carrito desde localStorage.
   */
  private carritoSubject: BehaviorSubject<any[]>;
/**
 * @description
 * Constructor del servicio CarritoService.
 * Inicializa el BehaviorSubject con el carrito cargado desde localStorage.
 * @param authService Servicio de autenticación para obtener la sesión del usuario.
 */
  constructor(private authService: AuthService) {
    const initialCarrito = this.loadCarrito();
    this.carritoSubject = new BehaviorSubject<any[]>(initialCarrito);
  }

  /**
   * @description
   * Observable que emite el estado actual del carrito.
   * Permite a los componentes suscribirse para recibir actualizaciones.
   */
  get carrito$(): Observable<any[]> {
    return this.carritoSubject.asObservable();
  }

  /**
   * @description
   * Obtiene la clave del carrito basada en el usuario logueado.
   * Si no hay usuario, retorna null.
   */
  private getKey(): string | null {
    const sesion = this.authService.getSesion();
    return sesion?.usuario ? `${sesion.usuario}_carrito` : null;
  }

  /**
   * @description
   * Carga el carrito desde localStorage utilizando la clave del usuario.
   * Si no hay carrito guardado, retorna un array vacío.
   */
  private loadCarrito(): any[] {
    const key = this.getKey();
    if (!key) return [];
    const carrito = localStorage.getItem(key);
    return carrito ? JSON.parse(carrito) : [];
  }

  /**
   * @description
   * Guarda el carrito en localStorage utilizando la clave del usuario.
   * Actualiza el BehaviorSubject para notificar a los suscriptores.
   */
  private saveCarrito(carrito: any[]): void {
    const key = this.getKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(carrito));
    this.carritoSubject.next(carrito); // Actualizar observable cuando guardas
  }

  /**
   * @description
   * Obtiene el carrito actual.
   * Utiliza el BehaviorSubject para obtener el valor actual.
   * @return {any[]} El carrito actual del usuario.
   */
  getCarrito(): any[] {
    return this.carritoSubject.value;
  }
  /**
   * @description
   * Agrega un producto al carrito.
   * Si el producto ya existe, incrementa su cantidad.
   * Si no existe, lo agrega con cantidad 1.
   * Actualiza el carrito en localStorage y notifica a los suscriptores.
   */
  addItem(item: any): void {
    //... tu lógica igual
    const carrito = this.getCarrito();
    const index = carrito.findIndex((i) => i.id === item.id);
    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...item, cantidad: 1 });
    }
    this.saveCarrito(carrito);
  }
/**
 * @description
 * Elimina un producto del carrito.
 * Si el producto existe, lo elimina del carrito y actualiza localStorage.
 * Si no existe, no hace nada.
 * Actualiza el carrito en localStorage y notifica a los suscriptores.  
 */
  removeItem(item: any): void {
    let carrito = this.getCarrito();
    const index = carrito.findIndex((i) => i.id === item.id);
    if (index > -1) {
      carrito.splice(index, 1);
      this.saveCarrito(carrito);
    }
  }

  /**
   * @description
   * Aumenta la cantidad de un producto en el carrito.
   * Si el producto existe, incrementa su cantidad y actualiza localStorage.
   * Si no existe, no hace nada.
   */
  increaseQuantity(itemId: any): void {
    const carrito = this.getCarrito();
    const item = carrito.find((i) => i.id === itemId);
    if (item) {
      item.cantidad += 1;
      this.saveCarrito(carrito);
    }
  }
  /**
   * @description
   * Disminuye la cantidad de un producto en el carrito.
   * Si la cantidad llega a 0, elimina el producto del carrito.
   * Actualiza localStorage y notifica a los suscriptores.
   */
  decreaseQuantity(itemId: any): void {
    const carrito = this.getCarrito();
    const item = carrito.find((i) => i.id === itemId);
    if (item) {
      item.cantidad -= 1;
      if (item.cantidad <= 0) {
        this.removeItem(item);
      } else {
        this.saveCarrito(carrito);
      }
    }
  }
  /**
   * @description
   * Limpia el carrito eliminando todos los productos.
   * Elimina el carrito de localStorage y notifica a los suscriptores.
   */
  clearCarrito(): void {
    const key = this.getKey();
    if (key) localStorage.removeItem(key);
    this.carritoSubject.next([]);
  }
  /**
   * @description
   * Finaliza la compra creando una venta con los productos del carrito.
   * Guarda la venta en localStorage y limpia el carrito.
   * Muestra un mensaje de éxito o error según corresponda.
   */
  finalizarCompra(): void {
    const sesion = this.authService.getSesion();
    if (!sesion) {
      Swal.fire({
        icon: 'error',
        title: 'No estás logueado',
        text: 'Por favor inicia sesión para realizar la compra.'
      });
      return;
    }
  
    const carrito = this.getCarrito();
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No hay productos en el carrito para comprar.'
      });
      return;
    }
  
    const venta = {
      id: new Date().getTime(),
      fecha: new Date().toISOString(),
      usuario: sesion.usuario,
      productos: carrito.map(item => ({
        id: item.id,
        nombre: item.name,
        cantidad: item.cantidad,
        precioUnitario: item.price,
        subtotal: item.price * item.cantidad
      })),
      total: carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)
    };
  
    const ventasLS = localStorage.getItem('ventas');
    let ventas = ventasLS ? JSON.parse(ventasLS) : [];
    ventas.push(venta);
    localStorage.setItem('ventas', JSON.stringify(ventas));
  
    this.clearCarrito();
  
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: `Gracias por tu compra, ${sesion.usuario}!`
    });
  }
}
