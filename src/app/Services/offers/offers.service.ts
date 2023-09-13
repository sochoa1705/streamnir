import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Offers, OffersNacInt } from '../../Models/offers/offers.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  items$: Observable<any[]>
  firestore: Firestore = inject(Firestore);

  constructor(private _httpClient: HttpClient) {
    const itemCollection = collection(this.firestore, 'ofertas');
    this.items$ = collectionData(itemCollection);
  }

  public getFlightsOffers(): Observable<Offers[]> {
    return this.items$;
  }

  getOffersNationalInternational(){
    let url = `${environment.urlNmviajes}/Flight/GetMostWanted?TrackingCode=6db3&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Interagencias`;
		return this._httpClient.get<OffersNacInt>(url);
  }

  getPackagesHome(){
    let url= `${environment.urlNmviajes}/Theme?Parameter.Active=true&TrackingCode=55b5&MuteExceptions=false&Caller.Company=Agil&Caller.Application=Interagencias`
    return this._httpClient.get<OffersNacInt>(url);
  }
}
