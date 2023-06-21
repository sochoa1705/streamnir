import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Offers } from '../../Models/offers/offers.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  items$: Observable<any[]>
  firestore: Firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'ofertas');
    this.items$ = collectionData(itemCollection);
  }

  public getFlightsOffers(): Observable<Offers[]> {
    return this.items$;
  }
}
