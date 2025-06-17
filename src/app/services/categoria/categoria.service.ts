import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

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

  constructor() { }

  getCategorias():Categoria[] {
    return this.categorias;
  }
}
