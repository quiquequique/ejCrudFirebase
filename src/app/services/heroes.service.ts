import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudfirebase-47dbc.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe ( heroe: HeroeModel ) {

    return this.http.post( `${ this.url }/heroes.json`, heroe)
      .pipe(
        map( (res: any) => {
          heroe.id = res.name;
          return heroe;
        })
      );

  }

  actualizarHeroe( heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id}.json`, heroeTemp);

  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
          map( res => this.crearArreglo( res ))
      );
  }
  private crearArreglo( heroesObj: object) {

    const heroes: HeroeModel[] = [];

    // console.log( heroesObj );

    if ( heroesObj === null ) { return []; }

    // console.log( Object.keys(heroesObj));

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });
    console.log( heroes );

    return heroes;
  }

}


