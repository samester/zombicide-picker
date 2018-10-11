import { Component, OnInit } from '@angular/core';
import Competence from '../models/competence.model';
import { FormGroup } from '@angular/forms';
import { CompetenceService } from '../service/competence.service';
@Component({
  selector: 'app-competence-form',
  templateUrl: './competence-form.component.html',
  styleUrls: ['./competence-form.component.scss']
})
export class CompetenceFormComponent implements OnInit {

  model: Competence = new Competence();
  myForm: FormGroup;
  compSave: Competence;
  constructor(private competenceService: CompetenceService) { }

  ngOnInit() {
  }

  newComp() {
    this.model = new Competence();
  }

  onSubmit() {
    this.competenceService.postCompetences(this.model).subscribe(
      (comp) => {
        this.compSave = comp;
        console.log(this.compSave);
      }
    )
    this.newComp();
  }

}
