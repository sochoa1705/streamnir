
// export interface IAerolineaInf{
//     CountryCode:string,
//     Country:string,
//     Items:IAerolineaInfResult[]
// }

// export interface IAerolineaInfResult {
//     ContinentCode: string,
//     Continent: string,
//     DestinationCode: string,
//     Destination: string,
//     Rate: number,
// }



export interface IAerolineaInf{
    IataCode:string,
    Name:string,
    Information:string,
    SmallLogo:string,
    Logo:string,
    Status:boolean,
    AirlineDetails:IAerolineaAirlineDetails[],
    AirlineGalleries:IAerolineaAirlineGalleries[],
}


interface IAerolineaAirlineDetails{
    Type:string,
    Description:string
}
interface IAerolineaAirlineGalleries{
    Photo:string,
    Tooltip:string
}