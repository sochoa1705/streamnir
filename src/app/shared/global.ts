import { IBooking } from '../api/api-checkout/models/rq-checkout-booking';
import { RDiscount } from '../api/api-checkout/models/rq-checkout-discount';
import { ExchangeRate, Group, PricingDetail } from '../api/api-checkout/models/rq-checkout-search';
import { IUpSell, Step } from '../api/api-checkout/models/rq-checkout-up-sell';
import { Search } from '../api/api-nmviajes/models/ce-metasearch';
import { RAdvanceSaleRule } from '../api/api-nmviajes/models/rq-advance-sale-rule.request';
import { ICountry } from '../api/api-nmviajes/models/rq-contries-get';
import { Configuraciones } from '../api/api-nmviajes/models/rq-token-ce-request';
import { dataInitBooking, dataSteps, detailPricingInit } from './constant-init';

export class GlobalComponent {
	public static appApplication: string = 'NMViajes';
	public static appBooking: IBooking = dataInitBooking;
	public static appCompany: string = 'Expertia';
	public static appConfigurations: Configuraciones;
	public static appDevice: number = 3; // WEB
	public static appExchangeRate: ExchangeRate;
	public static appGroupSeleted: Group;
	public static appIP: string = '';
	public static appReglasVentaAnticipada: RAdvanceSaleRule[] = [];
	public static appResponseGroups: Group[] = [];
	public static appShowGroups: number = 8;
	public static appTrackingCode: string = '';
	public static appWebId: number;
	public static classFligh = 'Economy';
	public static currency = 'USD';
	public static dataSteps: Step[] = [];
	public static detailPricing: PricingDetail = detailPricingInit;
	public static discountCampaing: RDiscount | null = null;
	public static indexSegmentSeleted: number[] = [];
	public static isB2B: boolean = false;
	public static isDomestic = false;
	public static isKayak = false;
	public static listCountries: ICountry[] = [];
	public static paramsSearch: any;
	public static searchData: Search;
	public static segmentSelected: number[] = [];
	public static tokenMotorVuelo: string = '';
	public static totalDaysTravel = 0;
	public static transactionId = '';
	public static upSellGroup: IUpSell[] = [];
	public static upSellSeleted: IUpSell | null = null;
	public static viajala: boolean = false;
	public static userGroupLab: string;
}
