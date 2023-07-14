import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public lettersPattern: string = "^[a-zA-ZÁ-ú ]+$";
  public emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  public alphanumericPattern: string = "^[a-zA-Z0-9 ]+$";
  public passwordPattern: string = "^(?=.*[0-9])(?=.*[a-zA-Z]).{6,10}$";
  public digitsPattern: string = "^[0-9]+$";

  constructor() { }

  equalFields(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const valueField1 = formGroup.get(field1)?.value.toUpperCase();
      const valueField2 = formGroup.get(field2)?.value.toUpperCase();

      if (valueField1 !== valueField2) {
        formGroup.get(field2)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }
  }

  validateAddress(dependentField: string, field: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!formGroup.get(dependentField)?.value) {
        formGroup.get(field)?.setErrors(null);
        return null;
      }

      const valueField = formGroup.get(field)?.value;

      if (valueField.length < 10 || valueField.length > 100) {
        formGroup.get(field)?.setErrors({ notValid: true });
        return { notValid: true };
      }

      formGroup.get(field)?.setErrors(null);

      return null;
    }
  }

  validateBusinessName(dependentField: string, field: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!formGroup.get(dependentField)?.value) {
        formGroup.get(field)?.setErrors(null);
        return null;
      }

      const valueField = formGroup.get(field)?.value;

      if (valueField.length < 3 || valueField.length > 80) {
        formGroup.get(field)?.setErrors({ notValid: true });
        return { notValid: true };
      }

      formGroup.get(field)?.setErrors(null);

      return null;
    }
  }

  validateRUC(dependentField: string, field: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (dependentField === '' || !formGroup.get(dependentField)?.value) {
        formGroup.get(field)?.setErrors(null);
        return null;
      }

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
