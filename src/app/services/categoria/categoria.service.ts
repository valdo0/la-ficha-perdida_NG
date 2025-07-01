import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
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
  private categorias:Categoria[] =[
    {
     id:1,
     nombre:"Estrategia y Aventura" ,
     descripcion:"Sumérgete en mundos épicos y desafía tu mente con nuestros juegos de estrategia más populares.",
     slug:"estrategia-aventura"
    },
    {
      id:2,
      nombre:"Familiares y Divertidos" ,
      descripcion:"Perfectos para noches de risas con amigos y familia. ¡Fáciles de aprender, difíciles de dejar!",
      slug:"familiares-y-divertidos"
     },
     {
      id:3,
      nombre:"Party Games" ,
      descripcion:"La mejor selección para animar cualquier reunión. ¡Adivina, ríe y compite con ingenio!",
      slug:"party-games"
     },
     {
      id:4,
      nombre:"Novedades" ,
      descripcion:"Siempre estamos buscando los últimos lanzamientos. ¡Sé el primero en jugar lo más nuevo!",
      slug:"novedades"
     }
  ]
/**
 * @description
 * Constructor del servicio CategoriaService.
 * Inicializa el servicio sin dependencias adicionales.
 */
  constructor() { }

  /**
   * @description
   * Obtiene la lista de categorías de juegos.
   * @returns {Categoria[]} Lista de categorías.
   */
  getCategorias():Categoria[] {
    return this.categorias;
  }
}
