import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(private authService: AuthService) {}

  private getKey(): string | null {
    const sesion = this.authService.getSesion();
    console.log(sesion)
    return sesion?.usuario ? `${sesion.usuario}_carrito` : null;
  }

  private loadCarrito(): any[] {
    const key = this.getKey();
    if (!key) return [];
    const carrito = localStorage.getItem(key);
    return carrito ? JSON.parse(carrito) : [];
  }

  private saveCarrito(carrito: any[]): void {
    const key = this.getKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(carrito));
  }

  getCarrito(): any[] {
    return this.loadCarrito();
  }

  addItem(item: any): void {
    const carrito = this.loadCarrito();
    const index = carrito.findIndex((i) => i.id === item.id);

    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...item, cantidad: 1 });
    }

    this.saveCarrito(carrito);
  }

  removeItem(itemId: any): void {
    let carrito = this.loadCarrito();
    carrito = carrito.filter((item) => item.id !== itemId);
    this.saveCarrito(carrito);
  }

  increaseQuantity(itemId: any): void {
    const carrito = this.loadCarrito();
    const item = carrito.find((i) => i.id === itemId);
    if (item) {
      item.cantidad += 1;
      this.saveCarrito(carrito);
    }
  }

  decreaseQuantity(itemId: any): void {
    const carrito = this.loadCarrito();
    const item = carrito.find((i) => i.id === itemId);
    if (item) {
      item.cantidad -= 1;
      if (item.cantidad <= 0) {
        this.removeItem(itemId);
      } else {
        this.saveCarrito(carrito);
      }
    }
  }

  clearCarrito(): void {
    const key = this.getKey();
    if (key) localStorage.removeItem(key);
  }
}
