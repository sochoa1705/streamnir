import { NO_ERRORS_SCHEMA } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { MATERIAL_SANITY_CHECKS } from "@angular/material/core"
import { RouterModule } from "@angular/router"
import { render } from "@testing-library/angular"
import { getByText, prettyDOM, screen } from "@testing-library/dom"
import { of } from "rxjs"
import { CardModule } from "src/app/shared/components/card/card.module"
import { PackageModule } from "src/app/shared/components/package/package.module"
import { TabsModule } from "src/app/shared/components/tabs/tabs.module"
import { MaterialModule } from "src/app/shared/material.module"
import { FlightComponent } from "./flight.component"
import { MOCK_AEREOLINEAS, MOCK_FLIGHT_NACIONAL, MOCK_VUELOS } from "./flight.mocked"
import { FlightService } from "./flight.service"
import { GeneratePricePipe } from "./pipes/generate-price.pipe"

const MockFlightService = {
  getPasajesAereos(){
    return of(MOCK_FLIGHT_NACIONAL)
  },
  getAereolineas(){
    return of([MOCK_AEREOLINEAS])
  },
  getVuelos(){
    return of(MOCK_VUELOS)
  }
}

describe( "packageComponent", ()=>{
    it("se renderiza correctamente la tabla de vuelos nacionales", async ()=>{

       const {container} = await render(FlightComponent, {
            declarations:[GeneratePricePipe],
            imports: [
                ReactiveFormsModule,
                TabsModule,
                MaterialModule,
                PackageModule,
                RouterModule,
                CardModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: FlightService, useValue: MockFlightService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
              ],
            routes:[]
          })

          const contenedorList:HTMLElement = container.querySelector('.boxVuelos')!; 
          const listItems:NodeListOf<HTMLDivElement> = contenedorList.querySelectorAll('.boxVuelos > div')!;

          expect(listItems).toHaveLength(MOCK_FLIGHT_NACIONAL.length);
        
          MOCK_FLIGHT_NACIONAL.forEach((flight) => getByText( contenedorList , new RegExp(flight.Destination, 'i')));
          
    
    })


})