import { Component } from '@angular/core';
import { NgForm }  from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `
    /* before of bootstrap classes. Now not necessary.
    .ng-invalid.ng-touched:not(form) {
      border-color: red;
    }

    .ng-valid.ng-touched:not(form) {
      border-color: #22c322;
    }
    */
    `
  ]
})
export class TemplateComponent {

  user: Object = {
    nombre: null,
    apellido: null,
    email: null,
    country: null,
    gender: null,
    terms: false,
  }

  countries = [{
    code: "ES",
    name: "Spain"
  },
  {
    code: "IT",
    name: "Italy"
  },
  {
    code: "FR",
    name: "France"
  }
  ];

  genders: string[] = ['Hombre', 'Mujer', 'Otro'];

  constructor() { }

  save(forma: NgForm) {
    console.log("NgForm full: ", forma);
    console.log("Value: ", forma.value);

    console.log("User: ", this.user);
  }

}
