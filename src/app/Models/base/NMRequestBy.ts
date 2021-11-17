import { environment } from "src/environments/environment";

export class NMRequestBy<T> {
  constructor(
    public Parametros: T,
    public Aplicacion: string = environment.nameAppAC,
    public CodigoSeguimiento: string = 'Web: nmviajes 2.0 - id: ' + new Date().valueOf().toString(),
    public CodigosEntorno: string = environment.codeEnvironmentAC
  ) { }
}