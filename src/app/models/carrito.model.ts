import { Producto } from './producto.model';
/**
 * @description
 * Modelo para el carrito de compras
 * Representa un artículo en el carrito con un producto y su cantidad.
 */
export interface CarritoItem {
  /**
   * @description
   * Producto que se está agregando al carrito
   * @type {Producto}
   * @memberof CarritoItem
   */
  producto: Producto;
  /**
   * @description
   * Cantidad del producto en el carrito
   * @type {number}
   * @memberof CarritoItem
   */
  cantidad: number;
}
