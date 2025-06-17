import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  carrito: any[] = [];
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
  }

  aumentarCantidad(id: any): void {
    this.carritoService.increaseQuantity(id);
    this.carrito = this.carritoService.getCarrito();
  }

  disminuirCantidad(id: any): void {
    this.carritoService.decreaseQuantity(id);
    this.carrito = this.carritoService.getCarrito();
  }

  eliminarItem(id: any): void {
    this.carritoService.removeItem(id);
    this.carrito = this.carritoService.getCarrito();
  }

  getTotal():number{
    return this.carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
  }
}
