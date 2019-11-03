import { AbstractControl, FormGroup } from '@angular/forms';

import { DataService } from '../services/data.service';

export class UcastnikValidator {
  static createDuplicateValidator(dataService: DataService) {
    // return (control: FormGroup) => {
    return (control: AbstractControl) => {
      const id = control.get('id');
      const cislo = control.get('cislo');
      const meno = control.get('meno');
      const priezvisko = control.get('priezvisko');
      const datumNarodenia = control.get('datumNarodenia');

      // if (!dataService.checkUcastnikoveCislo(id.value, cislo.value)) {
      //   return { duplicateCislo: true };
      // }
      // return dataService.checkUcastnik(+id.value, meno.value, priezvisko.value, datumNarodenia.value)
      //   ? null
      //   : { duplicateMeno: true };
      return null;
    };
  }
}
