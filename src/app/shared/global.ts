import { IBooking, Secure } from "../api/api-checkout/models/rq-checkout-booking";
import { ExchangeRate, Group, PricingDetail } from "../api/api-checkout/models/rq-checkout-search";
import { IUpSell } from "../api/api-checkout/models/rq-checkout-up-sell";
import { RAdvanceSaleRule } from "../api/api-nmviajes/models/rq-advance-sale-rule.request";
import { Configuraciones } from "../api/api-nmviajes/models/rq-token-ce-request";
import { dataInitBooking, detailPricingInit, detailSecureInit } from "./constant-init";


export class GlobalComponent {
    public static appTrackingCode: string = '';
    public static appIP: string = '';
    public static appCompany: string = 'Expertia';
    public static appApplication: string = 'NMViajes';
    public static appDevice: number = 3; // WEB
    public static appWebId: number;
    public static appShowGroups: number = 8;
    public static appResponseGroups: Group[] = [];
    public static appGroupSeleted:Group;
    public static appExchangeRate:ExchangeRate;
    public static appConfigurations:Configuraciones;
    public static appBooking: IBooking=dataInitBooking;
    public static isB2B: boolean = false;
    public static viajala: boolean = false;
    public static tokenMotorVuelo:string='';
    public static appReglasVentaAnticipada: RAdvanceSaleRule[]=[];
    public static segmentSelected:number[]=[];
    public static upSellGroup:IUpSell[]=[];
    public static upSellSeleted:IUpSell;
    public static detailPricing: PricingDetail=detailPricingInit;
    public static totalDaysTravel=0;
    public static isDomestic=false;
  }


 