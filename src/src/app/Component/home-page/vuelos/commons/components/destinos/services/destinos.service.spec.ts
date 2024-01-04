import { HttpRequest } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { mockedDestinos } from "../destino.models";
import { DestinosService } from "./destinos.service";




describe('DestinoService', () => {

    
let destinosService:DestinosService; 
let controller:HttpTestingController; 

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers: [
                DestinosService
            ]
        })

        destinosService = TestBed.inject(DestinosService);
        controller = TestBed.inject(HttpTestingController);
    })


    it('should ', () => {

        destinosService.getVuelos('MIA').subscribe((vuelos)=>{
            expect(vuelos).toEqual('response')
        })

        const request = controller.expectOne( (req: HttpRequest<any>) => {
            const url = environment.urlNmviajes + '/Flight/GetLastSearchesByCity'
            expect(req.url).toBe(url);        
            expect(req.method).toBe('GET');            
            return true
        })

    
        request.flush("response");


        controller.verify();
    
        });
});

