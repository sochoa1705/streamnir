import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/api/api-hotels/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels: Array<any>;

  constructor(
    private _hotelsService: HotelService
  ) { }

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels() {
    this._hotelsService.v1ApiHotelGet({
      'Parameter.Country': 'PE',
      'Parameter.City': 'CUZ',
      'Parameter.Site': 'nm_viajes',
      'Parameter.IsFlight': false,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      debugger
      this.hotels = JSON.parse(res).Result;
    });
  }

  validateScore(position: number, score: string): string {
    return Math.round(Number(score)) < position ? 'star-null' : 'star';
  }

}
