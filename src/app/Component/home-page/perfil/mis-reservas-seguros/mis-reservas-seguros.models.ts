export class GetMyBookings {
  constructor(
      public cot_Id:             string,
      public plan: string,
      public city_Source:          string,
      public city_Target:     string,
      public fec_Salida:     string,
      public fec_Llegada:          string,
      public timeLimit:        string,
      public tipo_Vuelo:          string,
      public tipo_Reserva:       string,
      public estado_Reserva:       string,
      public reserva_Id:     string,
      public rest_Search: string,
      public vuelos: Vuelos[]
  ){}
}
export class Vuelos{
  constructor(
      public city_Source:          string,
      public city_Target:     string
  ){}
}
