import { IOpenPayInfoRequestInterfaceGeneric } from './rq-openpay';

export interface IRequestDiscount {
	Bin?: string;
	TypeOfOperation?: string;
	Amount?: number;
	Destination?: string;
	SourceId?: string;
	AirlineId?: string;
	FlightClass?: string;
	FareBasis?: string;
}

export interface IDiscountResult {
	Amount: number;
	AmountDiscount: number;
	CampaignName: string;
	Discount: IOpenPayDiscount;
	IsSuccess: boolean;
	Message: string;
	TotalWithDiscount: number;
}

export interface IOpenPayDiscount {
	Type: string;
	Max: number;
	Value: number;
}

export interface IOpenPayDiscountRequest extends IOpenPayInfoRequestInterfaceGeneric<IRequestDiscount> {
}
