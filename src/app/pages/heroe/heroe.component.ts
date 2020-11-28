import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.heroesService.getHeroe( id ).subscribe( (res: HeroeModel) => {

        // console.log( res );

        this.heroe = res;
        this.heroe.id = id;

      });
    }
  }

  guardar( form: NgForm ): void {

    if ( form.invalid ) {

      console.log( 'formulario no valido ');

      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // console.log( form );
    // console.log( this.heroe );

    let peticion: Observable<any>;

    if ( this.heroe.id ) {

      peticion = this.heroesService.actualizarHeroe( this.heroe );

    } else {

      peticion = this.heroesService.crearHeroe( this.heroe );
    }

    peticion.subscribe( res => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Actualizado correctamente',
        icon: 'success'
      });
    });


  }

}
