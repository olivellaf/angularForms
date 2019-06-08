import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators }  from "@angular/forms";
import { Observable } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  user: Object = {
    'fullname': {
      'name': "Ferran",
      'surname': "Olivella"
    },
    'email': "ferry@gmail.com",
    // 'hobbies': ["Run", "Sleep", "Eat"]
  }

  constructor() {

    console.log(this.user);

    this.forma = new FormGroup({

      'fullname': new FormGroup({
        'name': new FormControl('Ferran', [
                                      Validators.required,
                                      Validators.minLength(3),
                                    ]),
        'surname': new FormControl('Olivella', [Validators.required,
                                       this.currentValidation]
                                       )
      }),

      'username': new FormControl('', [] , this.userExists),

      'email': new FormControl('ferry@gmail.com', [
                                    Validators.required,
                                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                  ]),

      'hobbies': new FormArray([
        new FormControl('Run', Validators.required )
      ]),

      'password1': new FormControl('123', Validators.required),
      'password2': new FormControl('123')
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.notTheSamePass.bind(this.forma)
    ])

    this.forma.controls['username'].valueChanges
      .subscribe( data => {
        console.log(data);
    })

    this.forma.controls['username'].statusChanges
      .subscribe( data => {
        console.log(data);
    })
    // this.forma.setValue( this.user );
  }

  saveChanges(){
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset({
    //   'fullname': ({
    //     'name': '',
    //     'surname': ''
    //   }),
    //   'email': ''
    // });
  }

  addNewHobbie() {
    (<FormArray>this.forma.controls['hobbies']).push(
      new FormControl('', Validators.required)
    )
  }

 /* olivella is not allowed as a surname. */
  currentValidation( control: FormControl ): { [s:string]: boolean } {
    if(control.value === "olivella") {
      return {
        'validation': true
      }
    }

    return null;
  }

  notTheSamePass( control: FormControl ): { [s:string]: boolean } {

    let forma = this;

    if( control.value !== forma.controls['password1'].value) {
      return {
        'notEquals': true
      }
    }

    return null;
  }

  userExists( control: FormControl ): Promise<any>|Observable<any>  {

    let promise = new Promise(

      (resolve, reject) => {
        setTimeout(()=> {
          if(control.value === "strider") {
            resolve( {exist: true })
          } else {
            resolve(null)
          }
        }, 3000 );
      }
    )
    return promise;
  }

}
