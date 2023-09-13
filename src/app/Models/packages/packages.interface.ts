export interface Packages{
    Result:Package[],
	TrackingCode: string,
	State:any
}

export interface Package {
    Id: string,
    Name: string,
    Description: string,
    ImageUrl: string,
    Price: number,
    Order: number,
    RedirectUrl: string,
    Active: boolean
}