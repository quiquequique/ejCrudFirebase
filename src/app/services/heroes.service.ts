import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudfirebase-47dbc.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ): Observable<any> {

    return this.http.post( `${ this.url }/heroes.json`, heroe)
      .pipe(
        map( (res: any) => {
          heroe.id = res.name;
          return heroe;
        })
      );

  }

  actualizarHeroe( heroe: HeroeModel): Observable<any> {

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id}.json`, heroeTemp);

  }

  getHeroes(): Observable<any> {
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
          map( res => this.crearArreglo( res )),
          delay( 1000 ) // delay solo para que se vea el mensaje de carga si es muy rapido
      );
  }
  private crearArreglo( heroesObj: object): any {

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

  getHeroe( id: string ): Observable<any> {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }

  borrarHeroe( id: string ): Observable<any> {

    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

}


