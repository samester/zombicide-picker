import Competence from './competence.model';

class CompetenceOfCharac {
  blue: Competence;
  yellow: Competence;
  orange: Competence[];
  red: Competence[];

  constructor() {
    this.blue = new Competence();
    this.yellow = new Competence();
    this.orange = [new Competence(), new Competence()];
    this.red = [new Competence(), new Competence(), new Competence()];
  }
}

class Character {
  _id: string;
  name: string;
  competences: CompetenceOfCharac;
  from: string;
  zombie: Character;

  constructor() {
    this.name = '';
    this.competences = new CompetenceOfCharac();
    this.from = '';
    this.zombie = undefined;
  }
}

export default Character;
