import { Component, OnInit } from '@angular/core';
import Competence from '../models/competence.model';
import { CharacterService } from '../service/character.service';
import { CompetenceService } from '../service/competence.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  competences: Competence[];
  name: string = '';
  from: string = '';
  blue = ''
  yellow = ''
  orangeOne = '';
  orangeTwo = '';
  redOne = '';
  redTwo = '';
  redThree = '';
  zombieMode = false;
  blueZ = ''
  yellowZ = ''
  orangeZOne = '';
  orangeZTwo = '';
  redZOne = '';
  redZTwo = '';
  redZThree = '';

  constructor(
    private characterService: CharacterService,
    private competenceService: CompetenceService
  ) { }

  ngOnInit() {
    this.competenceService.getCompetences().subscribe(
      (comps) => {
        this.competences = comps;
      }
    )
  }

  newChar() {
    this.name = '';
    this.from = '';
    this.blue = ''
    this.yellow = ''
    this.orangeOne = ''
    this.orangeTwo = ''
    this.redOne = ''
    this.redTwo = ''
    this.redThree = ''

  }

  onSubmit() {
    const charToSave = {
      name: this.name,
      competences: {
        blue: this.blue,
        yellow: this.yellow,
        orange: [this.orangeOne, this.orangeTwo],
        red: [this.redOne, this.redTwo, this.redThree],
      },
      from: this.from,
      zombie: undefined,
    }
    if (this.zombieMode) {
      const zombie = {
        name: `${this.name} Zombie`,
        competences: {
          blue: this.blueZ,
          yellow: this.yellowZ,
          orange: [this.orangeZOne, this.orangeZTwo],
          red: [this.redZOne, this.redZTwo, this.redZThree],
        },
        from: this.from,
      }
      this.characterService.postCharacters(zombie).subscribe(
        (char) => {
          charToSave.zombie = char._id;
          this.characterService.postCharacters(charToSave).subscribe(
            (char) => {
              this.newChar();
            }
          );
        }
      )
    } else {

      this.characterService.postCharacters(charToSave).subscribe(
        (char) => {
          this.newChar();
        }
      );
    }
  }

  onChange(value) {
    this.zombieMode = value.checked;
  }
}
