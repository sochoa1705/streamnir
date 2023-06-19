import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Offers } from '../../Models/offers/offers.model';
import { filter } from 'rxjs/operators';

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

  public getFlightsOffers() {
    return this.items$;
  }
}
