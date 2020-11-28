import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.cargando = true;

    this.heroesService.getHeroes().subscribe( res => {

      // console.log( res );

      this.heroes = res;

      this.cargando = false;

    });
  }

  borrarHeroe( heroe: HeroeModel, i: number ): void {

    Swal.fire({
      title: 'Seguro de borrar?',
      text: `Esta seguro de borrar a: ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( res => {

      if( res.value ) {

        this.heroesService.borrarHeroe( heroe.id).subscribe();

        this.heroes.splice(i, 1); // se podria llamar de nuevo a getHeroes pero es menos elegante y ahorro un call a api

      }
    });


  }

}
