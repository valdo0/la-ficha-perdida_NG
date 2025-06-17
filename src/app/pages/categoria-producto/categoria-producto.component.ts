import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Producto } from 'src/app/models/producto.model';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent {
  productos:Producto[]=[];
  constructor(private carritoService:CarritoService,private productoService : ProductoService,private route:ActivatedRoute){}

    ngOnInit(): void {
      const categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
      this.productos =  this.productoService.getProductosByCategoryId(categoryId);
    }
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
