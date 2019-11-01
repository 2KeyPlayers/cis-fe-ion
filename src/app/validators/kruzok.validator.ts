import { AbstractControl, FormGroup } from '@angular/forms';

import { DataService } from '../services/data.service';

export class KruzokValidator {
  static createDuplicateValidator(dataService: DataService) {
    // return (control: FormGroup) => {
    return (control: AbstractControl) => {
      const id = control.get('id');
      const nazov = control.get('nazov');

      return dataService.checkKruzok(+id.value, nazov.value) ? null : { duplicate: true };
    };
  }
}
