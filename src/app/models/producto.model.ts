/**
 * @description
 * Este modelo representa un producto en la aplicación.
 * Incluye propiedades como id, name, price, categoryId, description e imageUrl.
 */
export interface Producto {
  /**
   * @description
   * Identificador único del producto.
   * @type {number}
   */
  id: number;
  /**
   * @description
   * Nombre del producto.
   * @type {string}
   */
  name: string;
  /**
   * @description
   * Precio del producto.
   * @type {number}
   */
  price: number;
  /**
   * @description
   * Identificador de la categoría a la que pertenece el producto.
   * @type {number}
   */
  categoryId: number;
  /**
   * @description
   * Descripción del producto.
   * @type {string}
   */
  description?: string;
  /**
   * @description
   * URL de la imagen del producto.
   * @type {string}
   */
  imageUrl?: string;
}
