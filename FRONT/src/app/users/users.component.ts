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

  allCharacters: Character[] = [];
  characters: Character[] = [];
  description = '';

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters().subscribe(
      (chars) => {
        this.allCharacters = chars;
        this.allCharacters.forEach(
          (char) => {
            if(!char.name.endsWith(' Zombie')) {
              const newChar = new Character();
              newChar.name = char.name;
              newChar.competences = char.competences;
              newChar.from = char.from;
              newChar.zombie = char.zombie;
              newChar._id = char._id;
              this.characters.push(newChar);
            }
          }
        )
      }
    )
  }

  onClick(comp) {
    this.description = `${comp.fr} : ${comp.description}`;
  }

  switchZombie(index) {
    if (this.characters[index].zombie) {
      let charZombie = this.allCharacters.find(char => char._id === this.characters[index].zombie);
      if (!charZombie.zombie) {
        charZombie.zombie = this.characters[index]._id
      }
      this.characters[index].name = charZombie.name;
      this.characters[index].competences = charZombie.competences;
      this.characters[index]._id = charZombie._id;
      this.characters[index].zombie = charZombie.zombie;
    }
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
