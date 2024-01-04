export interface GenerarSafetyPayRQ {
  PromoterName:           string;
  CustomerName:           string;
  CustomerDocumentNumber: string;
  IdClient:               number;
  WebId:                  string;
  Mail:                   string;
  DKClient:               string;
  UserAgent:              string;
  IdUser:                 string;
  IpUser:                 string;
  Amount:                 Amount;
}

export interface Amount {
  FeeAmount:      number;
  RechargeAmount: number;
  Currency:       string;
}