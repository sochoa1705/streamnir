import { FareBreakDown } from "src/app/api/api-checkout/models/rq-checkout-search";

export const getPricingFareBreakDowns= (fareBreakDowns: FareBreakDown[]) => {
    let passengersCount = 0;
    let taxes = 0;
    let feeNMV = 0;
    let feePTA = 0;
    let totalADT = 0;
    let totalCNN = 0;
    let totalINF = 0;
    let totalPay = 0;
    let baseFareADT = 0;
    let baseFareINF = 0;
    let baseFareCNN = 0;
    let baseFareTotal = 0;

    fareBreakDowns.forEach((item: FareBreakDown) => {
        if (item.passengerType.equivalentCode == 'ADT') {
            baseFareADT = item.passengerFare.baseFare;
            totalADT = item.passengerType.quantity;
        }

        if (item.passengerType.equivalentCode == 'CNN') {
            totalCNN = item.passengerType.quantity;
            baseFareCNN = item.passengerFare.baseFare;
        }

        if (item.passengerType.equivalentCode == 'INF') {
            totalINF = item.passengerType.quantity;
            baseFareINF = item.passengerFare.baseFare;
        }

        passengersCount += item.passengerType.quantity;
        feeNMV += item.passengerFare.feeNMV * item.passengerType.quantity;
        feePTA += item.passengerFare.feePTA * item.passengerType.quantity;
        baseFareTotal += item.passengerFare.baseFare * item.passengerType.quantity;
        taxes += item.passengerFare.taxes * item.passengerType.quantity;
    });

    totalPay = baseFareTotal + taxes + feeNMV + feePTA;
    return {
        passengersCount,
        baseFareADT,
        baseFareINF,
        baseFareCNN,
        taxes,
        feeNMV,
        feePTA,
        totalADT,
        totalINF,
        totalCNN,
        totalPay
    };
}