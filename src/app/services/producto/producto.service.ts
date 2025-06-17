import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos:Producto []=[
    {
    id: 1,
    name: 'Arkham Horror 3ra Edición',
    price: 59990,
    categoryId: 1,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/arkham.webp'
  },
  {
    id: 2,
    name: 'Clank Legacy',
    price: 102990,
    categoryId: 1,
    description: 'Vive una campaña épica con decisiones permanentes mientras construyes tu propio universo de Clank. ¡Riesgo, estrategia y aventura garantizada!',
    imageUrl: 'assets/juegos/clank-legacy.webp'
  },
  {
    id: 3,
    name: 'Clank: Tesoros Sumergidos',
    price: 29990,
    categoryId: 1,
    description: 'Una expansión acuática para Clank que te desafía a saquear tesoros en un mundo sumergido. ¡Ten cuidado con lo que acecha bajo el agua!',
    imageUrl: 'assets/juegos/clan-tesoros-sumergidos.webp'
  },
  {
    id: 4,
    name: 'Dungeon Legends',
    price: 39990,
    categoryId: 1,
    description: 'Forma tu equipo de héroes y explora calabozos llenos de peligros, enemigos y secretos en este emocionante juego de fantasía táctica.',
    imageUrl: 'assets/juegos/dungeon-legends.jpg'
  },
  {
    id: 5,
    name: 'Eldritch Horror',
    price: 49990,
    categoryId: 1,
    description: 'Viaja por el mundo enfrentando horrores cósmicos en esta épica cooperativa inspirada en los mitos de Lovecraft. ¿Podrás salvar la humanidad?',
    imageUrl: 'assets/juegos/Eldritch-Horror.webp'
  },
  {
    id: 6,
    name: 'Descent Leyendas de las Tinieblas',
    price: 99990,
    categoryId: 1,
    description: 'Embárcate en una campaña narrativa inmersiva con miniaturas detalladas, combates intensos y una app que guía cada paso de tu aventura.',
    imageUrl: 'assets/juegos/descent-leyendas-de-las-tinieblas.webp'
  },
  {
    id: 7,
    name: 'Las Leyendas de Andor',
    price: 73990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/las-leyendas-de-andor.webp'
  },
  {
    id: 8,
    name: 'Robin Hood',
    price: 59990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/robin-hood.webp'
  },
  {
    id: 9,
    name: 'Tobago',
    price: 73990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/tobago.jpg'
  },
  {
    id: 10,
    name: 'Treos',
    price: 73990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/treos.jpg'
  },
  {
    id: 11,
    name: 'La comunidad del Anillo: El juego de cartas',
    price: 73990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/la-comunidad-anillo.jpg'
  },
  {
    id: 12,
    name: 'Trekking Through History',
    price: 73990,
    categoryId: 2,
    description: 'Explora los misterios sobrenaturales de Arkham en este juego cooperativo lleno de investigación, monstruos y decisiones críticas.',
    imageUrl: 'assets/juegos/trekking-through-history.webp'
  },
  {
    id: 13,
    name: 'Bang!',
    price: 18990,
    categoryId: 3,
    description: 'Un clásico del Lejano Oeste donde los forajidos, el sheriff y los renegados se enfrentan en un duelo estratégico lleno de engaños y acción.',
    imageUrl: 'assets/juegos/bang.webp'
  },
  {
    id: 14,
    name: '¡A Prueba de Retos!',
    price: 22990,
    categoryId: 3,
    description: 'Un dinámico party game lleno de pruebas físicas y mentales que pondrán a prueba tu creatividad, rapidez y capacidad para hacer reír a todos.',
    imageUrl: 'assets/juegos/a-prueba-de-retos.webp'
  },
  {
    id: 15,
    name: 'Chupilca',
    price: 14990,
    categoryId: 3,
    description: 'Un juego irreverente y social inspirado en la cultura chilena, ideal para romper el hielo y crear anécdotas inolvidables con tus amigos.',
    imageUrl: 'assets/juegos/chupilca.webp'
  },
  {
    id: 16,
    name: 'Burguer Ya',
    price: 19990,
    categoryId: 3,
    description: '¡Conviértete en el chef más veloz! Compite por armar las hamburguesas correctas antes que tus rivales en este juego rápido y sabroso.',
    imageUrl: 'assets/juegos/burger-ya.webp'
  },
  {
    id: 17,
    name: 'Detectives Paranormales',
    price: 33990,
    categoryId: 3,
    description: 'Investiga crímenes desde el más allá resolviendo misterios con la ayuda de pistas espirituales. ¡Ideal para los fans del suspenso sobrenatural!',
    imageUrl: 'assets/juegos/detectives-paranormales.webp'
  },
  {
    id: 18,
    name: '¡Bang! Explosión de dados',
    price: 0,
    categoryId: 4,
    description: 'Un juego rápido y lleno de tensión donde el sheriff, sus ayudantes, bandidos y renegados se enfrentan en el Salvaje Oeste. Usa dados para atacar, curarte o hacer explotar dinamita. Ideal para partidas rápidas con muchos jugadores.',
    imageUrl: 'assets/juegos/bang-explosion-dados.jpg'
  },
  {
    id: 19,
    name: 'Crea el Cosmos',
    price: 0,
    categoryId: 4,
    description: 'Conviértete en una deidad en formación mientras construyes tu propio sistema solar. Combina ciencia y estrategia para crear planetas, estrellas y vida, compitiendo por tener el cosmos más perfecto.',
    imageUrl: 'assets/juegos/crea-el-cosmos.jpg'
  },
  {
    id: 20,
    name: 'Happy Mochi',
    price: 0,
    categoryId: 4,
    description: 'Un adorable juego de recolección en el que los jugadores compiten por hacer la bandeja de mochi más sabrosa y colorida. Fácil de aprender, con arte encantador y perfecto para toda la familia.',
    imageUrl: 'assets/juegos/happy-mochi.jpg'
  },
  {
    id: 21,
    name: 'Marvel Champions LCG - Heroes Reunidos 3',
    price: 0,
    categoryId: 4,
    description: 'Un juego de cartas cooperativo donde los jugadores encarnan a héroes del universo Marvel enfrentando amenazas globales. Este pack incluye nuevos personajes, villanos y escenarios para expandir tu experiencia.',
    imageUrl: 'assets/juegos/marvel-champion.webp'
  },
  {
    id: 22,
    name: 'Splendor',
    price: 0,
    categoryId: 4,
    description: 'Un clásico de la estrategia donde los jugadores asumen el rol de mercaderes renacentistas. Recolecta gemas, compra cartas y atrae nobles para alcanzar la victoria. Rápido, elegante y competitivo.',
    imageUrl: 'assets/juegos/splendor.jpg'
  }
  ]
  constructor() { }

  getAllProductos(){
    return this.productos;
  }
  getProductosByCategoryId(id:number){
    return this.productos.filter(p=> p.categoryId==id);
  }
}
