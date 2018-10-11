import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Character from '../models/character.model';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  characters: Character[] = [];
  description = '';
  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters().subscribe(
      (chars) => {
        this.characters = chars;
      } 
    )
  }

  onClick(comp) {
    this.description = `${comp.fr} : ${comp.description}`;
  }

  // onTest() {
  //   const charToSave = {
  //     name: 'test',
  //     competences: {
  //       blue: 'Blitz',
  //       yellow:'Blitz',
  //       orange:['Nom Français', 'Blitz'],
  //       red: ['Brelage ', 'Blitz', 'Nom Français'],
  //     },
  //     from: 'OKOKOKOK',
  //   };
  //   this.characterService.postCharacters(charToSave).subscribe(
  //     (char) => {
  //       this.characters.push(char);
  //     }
  //   );
  // }
}
