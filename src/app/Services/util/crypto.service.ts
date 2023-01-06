import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  private passPhrase = '484060556f8744ab799c69961bc5a6c190f22097';

  encrypt = (plainText: string) => {
    //Encoding the Salt in from UTF8 to byte array
    var Salt = CryptoJS.lib.WordArray.random(32);
    //Creating the Vector Key
    var Iv = CryptoJS.lib.WordArray.random(16);
    //Encoding the Password in from UTF8 to byte array
    var Pass = CryptoJS.enc.Utf8.parse(this.passPhrase);
    //Creating the key in PBKDF2 format to be used during the decryption
    var key256Bits1000Iterations =
      CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 256 / 32, iterations: 1000 });

    //Decrypting the string contained in cipherParams using the PBKDF2 key
    var encrypted = CryptoJS.AES.encrypt(plainText,
      key256Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: Iv });

    var encryptedText = CryptoJS.enc.Base64.stringify(encrypted.ciphertext); //encrypted.toString(CryptoJS.enc.Utf8);
    var cipherWithSaltAndIv = CryptoJS.enc.Base64.stringify(Salt) +
      ":" +
      CryptoJS.enc.Base64.stringify(Iv) +
      ":" +
      encryptedText;

    return cipherWithSaltAndIv;
  }
}
