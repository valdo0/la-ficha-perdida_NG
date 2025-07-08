import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';
/**
 * @module ProductoService
 * @description
 * Servicio para manejar productos de un catálogo de juegos de mesa.
 * Proporciona métodos para obtener todos los productos y filtrar por categoría.
 * @example
 * const productoService = new ProductoService();
 * const allProductos = productoService.getAllProductos();
 * const juegosDeMesa = productoService.getProductosByCategoryId(1);
 */
@Injectable({
  providedIn: 'root'
})
/**
 * @description
 * Servicio para manejar productos de un catálogo de juegos de mesa.
 * Proporciona métodos para obtener todos los productos y filtrar por categoría.
 * @class ProductoService
 * @example
 * const productoService = new ProductoService();
 * const allProductos = productoService.getAllProductos();
 * const juegosDeMesa = productoService.getProductosByCategoryId(1);
 */
export class ProductoService {
  /** 
   * @description
   * Lista de productos del catálogo.
   * Cada producto tiene un id, nombre, precio, categoría, descripción e imagen.
   * @type {Producto[]}
   * @property {number} id - Identificador único del producto.
   */
  private apiUrl ='https://valdo0.github.io/api_lafichaperdida/producto.json'
  /**
   * @description
   * Crea una instancia del servicio ProductoService.
   * Este servicio no requiere parámetros en su constructor.
   */
  constructor(private http :HttpClient) { }

  /**
   * @description
   * Obtiene todos los productos del catálogo.
   * @returns {Producto[]} Lista de productos.
   */
  getAllProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * @description
   * Obtiene todos los productos del catálogo.
   * @returns {Producto[]} Lista de productos.
   */
  getProductosByCategoryId(id:number){
    let productos = this.http.get<Producto[]>(this.apiUrl);
    return productos.pipe(
      map(productos => productos.filter(producto => producto.categoryId === id))
    );
  }
}
