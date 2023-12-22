import { DateOrder, Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';

export const getDatesBySegment = (segments: Segment[]): DateOrder => {
	const startDateTime = segments.map((segment) => new Date(segment.startDateTime));
	const orderByEarly = startDateTime.slice().sort((a: any, b: any) => a - b);

    const endDateTime = segments.map((segment) => new Date(segment.endDateTime));
    const orderByLater = endDateTime.slice().sort((a: any, b: any) => a - b);
	return {
		dateEarlyDep: orderByEarly[0],
		dateLaterDep: orderByEarly[orderByEarly.length - 1],
		dateEarlyArr: orderByLater[0],
		dateLaterArr: orderByLater[orderByEarly.length - 1]
	};
};