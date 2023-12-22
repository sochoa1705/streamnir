export interface IRequestInterface {
	TrackingCode?: string;
	MuteExceptions?: boolean;
	Caller?: IRequestCallerInterface;
}

export interface IRequestCallerInterface {
	Company?: string;
	Application?: string;
	FromIP?: string;
	FromBrowser?: string;
}

export interface IResponseInterface<T> {
	TrackingCode?: string;
	State?: IState;
	Result?: T;
}

export interface IState {
	Ok?: boolean
}

export interface IOpenPayInfoResponseData {
	IsSuccess?: boolean;
	Message?: string;
	ResponseProcessInfoPaymentOpenPay?: IResponseProcessInfoPaymentOpenPay;
	ResponseProcessInfoPaymentOptions?: IResponseProcessInfoPaymentOptions;
}

export interface IResponseProcessInfoPaymentOpenPay {
	Username?: string;
	ID?: string;
	Currency?: string;
	Company?: string;
	Application?: string;
}

export interface IResponseProcessInfoPaymentOptions {
	IsActivePayu?: boolean;
	IsActiveOpenPay?: boolean;
	IsActiveOpenPayPagoLink?: boolean;
	IsActiveCuote?: boolean;
}

export interface IOpenPayInfoRequestInterfaceGeneric<T> extends IRequestInterface {
	Parameter?: T;
}

export interface IOpenPayInfoRequest extends IOpenPayInfoRequestInterfaceGeneric<IResponseProcessInfoPaymentOpenPay> {
}

export interface IOpenPayInfoResponse extends IResponseInterface<IOpenPayInfoResponseData> {
}
