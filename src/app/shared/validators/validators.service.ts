import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public lettersPattern: string = "^[a-zA-ZÁ-ú ]+$";
  public emailPattern: string = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
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
}
