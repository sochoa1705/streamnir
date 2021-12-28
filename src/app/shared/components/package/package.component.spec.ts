import { NO_ERRORS_SCHEMA } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { MATERIAL_SANITY_CHECKS } from "@angular/material/core"
import { render } from "@testing-library/angular"
import { screen } from "@testing-library/dom"
import { DestinyService } from "src/app/Services/destiny/destiny.service"
import { MaterialModule } from "../../material.module"
import { CalendarModule } from "../calendar/calendar.module"
import { PopUpPasajeroModule } from "../pop-up-pasajero/pop-up-pasajero.module"
import { PackageComponent } from "./package.component"


describe( "packageComponent", ()=>{

    it("se renderiza correctamente la imagen de vuelos internacionales", async ()=>{

        const { container, fixture } = await render(PackageComponent, {
            componentProperties: {
                span: '$398',
                city: 'New York',
                image:'currentValue'
            },
            imports: [
                ReactiveFormsModule,
                PopUpPasajeroModule,
                MaterialModule,
                CalendarModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
              ],
            routes:[]
          })

          expect(screen.getByText(/new york/i)).toBeVisible()
          
    
    })


})