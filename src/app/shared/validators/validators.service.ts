import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public lettersPattern: string = "^[a-zA-ZÁ-ú ]+$";
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";//"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  public alphanumericPattern: string = "^[a-zA-Z0-9 ]+$";
  public passwordPattern: string = "^(?=.*[0-9])(?=.*[a-zA-Z]).{6,10}$";
  public digitsPattern: string = "^[0-9]+$";

  constructor() { }

  equalFields(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const valueField1 = formGroup.get(field1)?.value;
      const valueField2 = formGroup.get(field2)?.value;

      if (valueField1 !== valueField2) {
        formGroup.get(field2)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }
  }

  validateRUC(field: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const valueField = formGroup.get(field)?.value;

      const initialNumbers = ['10', '20', '15', '16', '17'];

      if (!initialNumbers.includes(valueField.slice(0, 2))) {
        formGroup.get(field)?.setErrors({ notValid: true });
        return { notValid: true };
      }

      const checkDigit: Number = Number(valueField[10]);

      const calculatedDigit: Number =
        (11 - (
          (
            Number(valueField[0]) * 5 +
            Number(valueField[1]) * 4 +
            Number(valueField[2]) * 3 +
            Number(valueField[3]) * 2 +
            Number(valueField[4]) * 7 +
            Number(valueField[5]) * 6 +
            Number(valueField[6]) * 5 +
            Number(valueField[7]) * 4 +
            Number(valueField[8]) * 3 +
            Number(valueField[9]) * 2
          ) % 11) % 10);

      if (checkDigit !== calculatedDigit) {
        formGroup.get(field)?.setErrors({ notValid: true });
        return { notValid: true };
      }

      formGroup.get(field)?.setErrors(null);

      return null;
    }
  }
}
