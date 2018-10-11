import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import Competence from '../models/competence.model';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  baseUrl = `http://${window.location.hostname}:3000/api/competences`;
  constructor(private http: HttpClient) { }

  getCompetences() {
    return this.http.get(this.baseUrl).pipe(
      map(
        (res) => {
          console.log(res['competences']);
          
          return res['competences'] as Competence[];
        }
      )
    );
  }

  postCompetences(comp: Competence) {
    return this.http.post(this.baseUrl, comp).pipe(
      map(
        (res) => {
          return res['competence'] as Competence;
        }
      )
    );
  }
}
