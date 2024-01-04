import { GetNombrePipe } from "./getNombrePopUp.pipe"


describe('GetNombrePipe', ()=>{

    it('Debe crear una instancia', ()=>{
        const pipe = new GetNombrePipe();
        expect(pipe).toBeTruthy();
    })

    it('Debe retornar el nombre de: Pasajeros', ()=>{
        const pipe = new GetNombrePipe();
        const onlyPasajeros = true;
        const result = pipe.transform(onlyPasajeros);
        const mocked = "Pasajeros";

        expect(result).toEqual(mocked);
    })

    it('Debe retornar el nombre de: Habitación - Pasajero', ()=>{
        const pipe = new GetNombrePipe();
        const onlyPasajeros = false;
        const result = pipe.transform(onlyPasajeros);
        const mocked = "Habitación - Pasajero";

        expect(result).toEqual(mocked);
    })

})