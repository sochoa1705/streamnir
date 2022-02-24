import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NmvModel } from 'src/app/shared/utils';
import { ResponseModelT } from 'src/app/shared/models';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export interface IGetData {
    UserId:         number;
    Firstname:      string;
    FatherLastname: string;
    MotherLastname: string;
    Birthdate:      Date;
    Nationality:    string;
    CountryId:      number;
    DocumentType:   string;
}

export interface IGetContact {
    UserId:         number;
    CountryId:      number;
    ProvinceId:     number;
    CityId:         number;
    Number:         string;
    InteriorNumber: string;
    DistrictId:     number;
    PostalCode:     string;
    Phone:          string;
    MobilePhone:    string;
}


@Injectable()
export class ContactoService {
    constructor(private httpClient: HttpClient) { }



    getData(userId: number) {
        const nmvModel = new NmvModel();
    
        const options = {
          params: nmvModel.params.set('Parameter.UserId', userId)
        };
    
        const url = environment.urlNmviajesAccount + '/Profile/GetData';
    
        return this.httpClient
          .get<ResponseModelT<IGetData>>(url, options)
          .pipe(map((resp) => resp.Result));
      }

    getContact(userId: number) {
        const nmvModel = new NmvModel();
    
        const options = {
          params: nmvModel.params.set('Parameter.UserId', userId)
        };
    
        const url = environment.urlNmviajesAccount + '/Profile/GetContact';
    
        return this.httpClient
          .get<ResponseModelT<IGetContact>>(url, options)
          .pipe(map((resp) => resp.Result));
      }


      getInformation(userId: number){
          return forkJoin([this.getData(userId),this.getContact(userId)])
      }
    
}