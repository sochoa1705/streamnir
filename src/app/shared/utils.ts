import { HttpParams } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

export function Guid() {
  return Math.floor(Math.random() * 0x10000).toString(16);
}

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export class NmvModel {
  public params: HttpParams;

  constructor() {
    this.setParams();
  }

  setParams() {
    this.params = new HttpParams()
      .set('TrackingCode', Guid())
      .set('MuteExceptions', environment.muteExceptions)
      .set('Caller.Company', 'Agil')
      .set('Caller.Application', 'Interagencias');
  }

  getPayload() {
    return {
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      Caller: {
        Company: 'Agil',
        Application: 'Interagencias',
      },
    };
  }
}

export function removeTimeZonePart(dateString: string) {
  let finalDate = '';
  if (dateString.split('+').length > 1) {
    let b = dateString.split('+');

    finalDate = b[0];
  } else {
    let b = dateString.split('-');
    if (b.length > 1) {
      b.pop();
      finalDate = b.join('-');
    }
  }
  return finalDate;
}

export function toUp() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

export function roundNumber(numero: number, decimal: number) {
  let n = numero * Math.pow(10, decimal);
  n = Math.round(n) / Math.pow(10, decimal);
  return n;
}

export function objectToQueryString(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

export function routerToCapitalice(route: string) {
  var splitStr = route.slice(1).split('/');

  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

export function generateLabelTag() {
  const pathname = window.location.pathname;

  return pathname ? routerToCapitalice(pathname) : '';
}

// export function deleteExtension(x: string) {
//   return x.replace(/\.[^/.]+$/, '');
// }

export function getFileName(src: string) {
  return src.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
}

export class Utilities {
  static getCardType(card: string): string {
    let result: string = '';

    var re = new RegExp('^4');
    if (card.match(re) != null) result = 'Visa';

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        card
      )
    )
      result = 'Mastercard';

    // American express
    re = new RegExp('^3[47]');
    if (card.match(re) != null) result = 'American express';

    // Diners
    re = new RegExp('^36');
    if (card.match(re) != null) result = 'Diners';

    // Diners
    re = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}');
    if (card.match(re) != null) result = 'Diners';

    return result;
  }
}
