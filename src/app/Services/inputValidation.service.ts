import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class InputValidationService {
  VALID_NAME = /[A-Za-záéíóúÁÉÍÓÚñÑüÜ ]/;
  VALID_MAIL = /[a-z\d\.@-]/;
  VALID_NUM_DOC = /[0-9]/;
  VALID_TEL = /[0-9()-]/;
  VALID_ADDRESS = /[\wáéíóúÁÉÍÓÚñÑüÜ,#&' -\.]/;
  VALID_NUMBER = /[0-9\.]/
  
  removeNonValid(event : KeyboardEvent, validChars : any)
  {   
     var k;
     k = event.key;
     var validRegex = validChars;
     return validRegex.test(k);
  }
}