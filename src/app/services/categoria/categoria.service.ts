import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { map, Observable } from 'rxjs';
/**
 * @description
 * Servicio para manejar las categorías de juegos.
 * Proporciona métodos para obtener una lista de categorías predefinidas.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * @description
 * Servicio para manejar las categorías de juegos.
 * Proporciona métodos para obtener una lista de categorías predefinidas.
 * @class CategoriaService
 */
export class CategoriaService {
/**
 * @description
 * Lista de categorías de juegos.
 * Cada categoría incluye un ID, nombre, descripción y un slug para URL amigable.
 * @type {Categoria[]}
 * @property {number} id - Identificador único de la categoría.
 * @property {string} nombre - Nombre de la categoría.
 * @property {string} descripcion - Descripción de la categoría.
 * @property {string} slug - Slug para URL amigable de la categoría.
 */
/**
 * @description
 * Constructor del servicio CategoriaService.
 * Inicializa el servicio sin dependencias adicionales.
 */
  constructor(private http:HttpClient) { }

  /**
   * @description
   * Obtiene la lista de categorías de juegos.
   * @returns {Categoria[]} Lista de categorías.
   */
  getCategorias():Observable<Categoria[]> {
    return this.http.get<Categoria[]>('https://valdo0.github.io/api_lafichaperdida/categoria.json');
  }
  /**
   * @description
   * Obtiene una categoría específica por su ID.
   * @param {number} id - Identificador único de la categoría.
   * @returns {Categoria | undefined} La categoría correspondiente al ID, o undefined si no se encuentra.
   */
  getCategoriaById(id: number): Observable<Categoria | undefined> {
    return this.http.get<Categoria[]>('https://valdo0.github.io/api_lafichaperdida/categoria.json').pipe(
      map(categorias => categorias.find(categoria => categoria.id === id))
    );
  }
}
