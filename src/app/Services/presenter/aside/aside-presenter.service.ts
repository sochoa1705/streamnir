import { Injectable } from '@angular/core';
import { Aside } from 'src/app/Models/general/aside';

@Injectable({
  providedIn: 'root'
})
export class AsidePresenterService {
  slider: Aside[] = [
      {
        id: 0,
        img: "bannerHOME.jpg",
        key: true,
        class: "active"
      },
      {
        id: 1,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
        class: "" 
      },
      {

        id: 2,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
        class: ""
      },
      {

        id: 3,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
        class: ""
      },
      {

        id: 4,
        img: "3-PlayaDelCarmen.jpg",
        key: true,
        class: ""
      }
    ];

    images: Aside[] = [
      {
        id: 1,
        img: "6-Orlando.jpg",
        key: false,
      },
      {
        id: 2,
        img: "6-Orlando.jpg",
        key: false,
      },
    ];
  
  constructor() { }
}
