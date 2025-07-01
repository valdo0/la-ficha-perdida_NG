/**
 * @description
 * Este modelo representa una categoría en la aplicación.
 * Contiene propiedades para el identificador, nombre, descripción y slug de la categoría.
 * @property {number} id - Identificador único de la categoría.
 * @property {string} nombre - Nombre de la categoría.
 * @property {string} descripcion - Descripción de la categoría.
 * @property {string} slug - Slug de la categoría, utilizado para URLs amigables.
 */
export interface Categoria {
  /**
   * @description
   * Identificador único de la categoría.
   * @property {number} id - Identificador único de la categoría.
   */
    id: number;
    /**
     * @description
     * nombre de la categoría.
     * @property {string} nombre - Nombre de la categoría.
     */
    nombre: string;
    /**
     * @description
     * Descripción de la categoría.
     * @property {string} descripcion - Descripción de la categoría.
     */
    descripcion:string;
    /**
     * @description
     * Slug de la categoría, utilizado para URLs amigables.
     * @property {string} slug - Slug de la categoría.
     */
    slug:string
  }
  