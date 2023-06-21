import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { GalleryItem } from '../../Models/gallery/gallery-item.model';

@Injectable({
	providedIn: 'root'
})
export class GalleryService {
	items$: Observable<any[]>
	firestore: Firestore = inject(Firestore);

	constructor() {
		const itemCollection = collection(this.firestore, 'galeria');
		this.items$ = collectionData(itemCollection);
	}

	public getGalleryItems(): Observable<GalleryItem[]> {
		return this.items$;
	}
}
