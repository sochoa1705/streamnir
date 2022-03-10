import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets() {
    this._ticketsService.v1ApiTicketsGet({
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
      this.tickets = JSON.parse(res).Result;
    });
  }

}
