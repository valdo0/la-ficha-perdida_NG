import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias:Categoria[]=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private categoriasService :CategoriaService
  ) {}

  ngOnInit(): void {
    this.categorias = this.categoriasService.getCategorias();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        setTimeout(() => this.viewportScroller.scrollToAnchor(fragment), 100);
      }
    });
  }
}
