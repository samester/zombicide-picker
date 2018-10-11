import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from "rxjs/operators";
import Character from '../models/character.model';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  
  baseUrl = `http://${window.location.hostname}:3000/api/characters`;

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get(this.baseUrl).pipe(
      map(
        (res) => {
          return res['characters'] as Character[];          
        }
      )
    );
  }

  postCharacters(charac) {
    console.log(charac);
    
    return this.http.post(this.baseUrl, charac).pipe(
      map(
        (res) => {
          return res['character'] as Character;
        }
      )
    );
  }
}
