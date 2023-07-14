import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/api/api-tickets/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  tickets: Array<any>;

  @Input()
  city: any;

  @Input()
  site: any;

  @Input()
  isflight: any;

  responsiveOptions: any[];

  constructor(
    private _ticketsService: TicketsService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      let city: string = this.city || params.city;
      let site: string = this.site || params.site;
      let isFlight: boolean = this.isflight === undefined ? params.isflight : this.isflight;
      this.getAllTickets(city, site, isFlight);
    });
  }

  getAllTickets(city: string, site: string, isflight: boolean) {

    this._ticketsService.v1ApiTicketsGet({
      'Parameter.Country': 'PE',
      'Parameter.City': city,
      'Parameter.Site': site,
      'Parameter.IsFlight': isflight,
      TrackingCode: Guid(),
      MuteExceptions: environment.muteExceptions,
      'Caller.Company': "Agil",
      'Caller.Application': "Interagencias"
    }).subscribe((res: any) => {
      this.tickets = JSON.parse(res).Result;
    });
  }

}
