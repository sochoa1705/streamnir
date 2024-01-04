import { IAerolineas } from "./models/resultados.interfaces";

export const MockedResultados:IAerolineas[] = [
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "a5d0d7aa-272a-4185-8cdf-da59a16beb59",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:30:00",
						"endDateTime": "2022-02-26T17:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T16:30:00",
								"arrivalDateTime": "2022-02-26T17:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:10:00",
						"endDateTime": "2022-02-26T18:25:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T17:10:00",
								"arrivalDateTime": "2022-02-26T18:25:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:05:00",
						"endDateTime": "2022-02-26T19:20:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2006,
								"departureDateTime": "2022-02-26T18:05:00",
								"arrivalDateTime": "2022-02-26T19:20:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 2,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:30:00",
						"endDateTime": "2022-02-26T19:45:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2091,
								"departureDateTime": "2022-02-26T18:30:00",
								"arrivalDateTime": "2022-02-26T19:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 3,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:30:00",
						"endDateTime": "2022-02-26T20:45:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2072,
								"departureDateTime": "2022-02-26T19:30:00",
								"arrivalDateTime": "2022-02-26T20:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 4,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:20",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "A",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 5,
					"flightDuration": "01:25",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "A",
							"isReturn": false,
							"rph": 5,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "A00QPQZB",
								"cabin": "A"
							}
						],
						"passengerFare": {
							"baseFare": 57.0,
							"taxes": 26.08,
							"totalFare": 83.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "A00QPQZB",
								"cabin": "A"
							}
						],
						"passengerFare": {
							"baseFare": 57.0,
							"taxes": 26.08,
							"totalFare": 83.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "7f91eb9d-d9b5-4b8b-b466-f1cba64fea67",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T07:00:00",
						"endDateTime": "2022-02-26T08:15:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2056,
								"departureDateTime": "2022-02-26T07:00:00",
								"arrivalDateTime": "2022-02-26T08:15:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "319",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T07:25:00",
						"endDateTime": "2022-02-26T08:40:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2011,
								"departureDateTime": "2022-02-26T07:25:00",
								"arrivalDateTime": "2022-02-26T08:40:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T13:50:00",
						"endDateTime": "2022-02-26T15:05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2065,
								"departureDateTime": "2022-02-26T13:50:00",
								"arrivalDateTime": "2022-02-26T15:05:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 2,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:10:00",
						"endDateTime": "2022-02-26T15:25:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2149,
								"departureDateTime": "2022-02-26T14:10:00",
								"arrivalDateTime": "2022-02-26T15:25:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 3,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:20:00",
						"endDateTime": "2022-02-26T15:35:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2015,
								"departureDateTime": "2022-02-26T14:20:00",
								"arrivalDateTime": "2022-02-26T15:35:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 4,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "319",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:20",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 5,
					"flightDuration": "01:25",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 5,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "G00QPGZB",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 60.0,
							"taxes": 26.58,
							"totalFare": 86.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "G00QPGZB",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 60.0,
							"taxes": 26.58,
							"totalFare": 86.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "053b55c4-1176-4a9a-887b-bc0aa2c845b5",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T07:40:00",
						"endDateTime": "2022-02-26T08:55:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2019,
								"departureDateTime": "2022-02-26T07:40:00",
								"arrivalDateTime": "2022-02-26T08:55:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:20",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01:25",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 1,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "G00QPGZB",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 60.0,
							"taxes": 26.58,
							"totalFare": 86.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "G00QPGZB",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 60.0,
							"taxes": 26.58,
							"totalFare": 86.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "cc2dc68a-1b87-4b3e-861e-212f4bd1db68",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:30:00",
						"endDateTime": "2022-02-26T17:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T16:30:00",
								"arrivalDateTime": "2022-02-26T17:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:10:00",
						"endDateTime": "2022-02-26T18:25:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T17:10:00",
								"arrivalDateTime": "2022-02-26T18:25:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 2,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:05:00",
						"endDateTime": "2022-02-26T19:20:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2006,
								"departureDateTime": "2022-02-26T18:05:00",
								"arrivalDateTime": "2022-02-26T19:20:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 3,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:30:00",
						"endDateTime": "2022-02-26T19:45:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2091,
								"departureDateTime": "2022-02-26T18:30:00",
								"arrivalDateTime": "2022-02-26T19:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 4,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:30:00",
						"endDateTime": "2022-02-26T20:45:00",
						"stops": 0,
						"segmentId": 5,
						"flightDuration": "01:15",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2072,
								"departureDateTime": "2022-02-26T19:30:00",
								"arrivalDateTime": "2022-02-26T20:45:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 5,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T19:15:00",
					"endDateTime": "2022-02-28T20:30:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:15",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2066,
							"departureDateTime": "2022-02-28T19:15:00",
							"arrivalDateTime": "2022-02-28T20:30:00",
							"cabin": "A",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T21:25:00",
					"endDateTime": "2022-02-28T22:40:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01:15",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2073,
							"departureDateTime": "2022-02-28T21:25:00",
							"arrivalDateTime": "2022-02-28T22:40:00",
							"cabin": "A",
							"isReturn": false,
							"rph": 1,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "A00QPQZB",
								"cabin": "A"
							}
						],
						"passengerFare": {
							"baseFare": 61.0,
							"taxes": 26.78,
							"totalFare": 87.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "A00QPQZB",
								"cabin": "A"
							}
						],
						"passengerFare": {
							"baseFare": 61.0,
							"taxes": 26.78,
							"totalFare": 87.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "eac847d6-71fb-4581-8d7e-1bf0f39b626e",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:11:00",
						"endDateTime": "2022-02-26T17:38:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:27",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 613,
								"departureDateTime": "2022-02-26T16:11:00",
								"arrivalDateTime": "2022-02-26T17:38:00",
								"cabin": "B",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:34:00",
						"endDateTime": "2022-02-26T21:01:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:27",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 603,
								"departureDateTime": "2022-02-26T19:34:00",
								"arrivalDateTime": "2022-02-26T21:01:00",
								"cabin": "B",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T07:26:00",
					"endDateTime": "2022-02-28T08:52:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:26",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 604,
							"departureDateTime": "2022-02-28T07:26:00",
							"arrivalDateTime": "2022-02-28T08:52:00",
							"cabin": "B",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 9,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							},
							"marketingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "VV",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "BBAOWGV",
								"cabin": "B"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "BBAOWGV",
								"cabin": "B"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "c9f60be8-0443-46b3-83ac-dbc3339fab40",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T05:30:00",
						"endDateTime": "2022-02-26T06:55:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:30:00",
								"arrivalDateTime": "2022-02-26T06:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T20:30:00",
						"endDateTime": "2022-02-26T21:55:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5081,
								"departureDateTime": "2022-02-26T20:30:00",
								"arrivalDateTime": "2022-02-26T21:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:40:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5084,
							"departureDateTime": "2022-02-28T20:40:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "981e0fd0-ffc4-4f57-aca6-6f1696d19c80",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:35:00",
						"endDateTime": "2022-02-26T19:00:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00",
								"arrivalDateTime": "2022-02-26T19:00:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 6,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:40:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5084,
							"departureDateTime": "2022-02-28T20:40:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 6,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 62.0,
							"taxes": 26.98,
							"totalFare": 88.98,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "1038af8b-e046-4fc1-aae0-5a2bbe57ed9e",
		"departure": [
			{
				"departureDate": "2022-02-26T18:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:30:00",
						"endDateTime": "2022-02-26T19:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2091,
								"departureDateTime": "2022-02-26T18:30:00",
								"arrivalDateTime": "2022-02-26T19:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "Ceu7FQbEU1KJnoJr1-5Dd9Y4Ik6kE90xEfvX5_0fQQc8Z1uVZc0X_JFrLEkg1XWwPkv8dHhk_5iyj5H9Q3CLbqE22NJebDSAN5UuiBiCpriWR9b_IAy4egi-7TYxh-9rxksstE3ILxsJErQ89KjA5PHIV2366HEe9JWxWsIspzQDZr9rk9V-8MRgs5dAvCcRniJZgU4ze0lRzyq96NHFNjDkTWhRJ8pgmYw_LHZ_pMWyP2VoRBdKuPijLJDVWaYY9rZ6ARaDgKMQ_2-TFDoJJXTvzY7F7UY3c0F85O_BVVvHoF13PMbiOi-sJ68ZObagtfEmS5-IV_swYySP3l0-e1hGS_mz7yYSLjUuzr7DxGEJoJBsQS71cf8qOGe_3gbkBVmZsG0Ig5rL5dI6KMg3fMvGwpKOXIG6nxsnhXvoUXHl15eeNt0FGPsi0gRhGXztB63X_Y1uYyHVHr93BPSCECA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "bb4ff6c8-fad3-4cc4-8659-ce5fc72b999b",
		"departure": [
			{
				"departureDate": "2022-02-26T17:10",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:10:00",
						"endDateTime": "2022-02-26T18:25:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T17:10:00",
								"arrivalDateTime": "2022-02-26T18:25:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CoUy4XoVgV82ANyxNWf2vbUBvswLV6YVPBxlR1L0j2gTyu7jdrX6ZbERIqQyu4dIbOxGM9Gaph6OiXeQLE8gFAGnqH5Q6_jEuiIna5juoHxdcF--3VI05s0gZ5BdttdyU2GV1ZHXNgGcLZ9jsFyUjTJVG7ekAFspYroorcxzLeEjVBPWRCZFWNm2f3UdCkau1BECZVH-gFeyzURSQp-g_WruTsdbyayHRvwpZqNDcjsE3KCDawOVrT_8wQnbxJ-HUkqffsYEwEU_sfeX2dhvLaYTJ4OY4yL0I70zxvjFva3pv7DKOE0sDZlTaKEjpLWmtmxjMGq0L5crlk2TdX5R_QsS2e9WqdoJZ3efhNMF2UxvLSdgSv2LSLkYJfqVM9GEea2tKhkogqdp2Qr6REooPVUo2CZIeLf83R4Sead0VP5zgyr7G9GfrgCQug9RkDWBgC-dZ2MPWzWFhDlVuS-TvAQ=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "41241cce-18e1-4bf5-9b44-641e25522335",
		"departure": [
			{
				"departureDate": "2022-02-26T16:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:30:00",
						"endDateTime": "2022-02-26T17:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T16:30:00",
								"arrivalDateTime": "2022-02-26T17:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "Cs5kRVQShsOz1rjDcc3PEedv8NgQLGvh42DUHZrFkf_gOi6PKbY82NVQ9gYoben7gfHBHXM4daWcJ6SJaMhD2tAvlLkIUcT-cNSaYTQpu2d-Ln6v4GLFm3baGyXFTJzvPykbunvHL33QUFOIiWTsZatQjVHq0PGzHqKIIguUNRuUa98CrZUVAcop-dlwoHiuXiywwtajZHtlVCBF17dvl4YQVWkeshtClSneXc953MIV4paX8rsDtKDSIxGxz-n8Y2eghkjW_O1pOwXkXUCk1NekUzIaXJRHvJIteZVDYALDYhLdC0nRa5Z1Jx5N6Mn6-2zxjdzVDDNDeDgxe9yeeKk_NjeA7KFkkqFyc9KVsrcveEVJ6zSLSVVlTCf4OacKkTJH9iNotG0TOijfQFnUOorxmEKYkAzVnbYmMqdCC3WV7JuTUGtlOAqgeeu1rPU4UzpZxuhsetvRwszxPP52ELA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "0a614ca7-ee5a-4484-8729-3190432a91a4",
		"departure": [
			{
				"departureDate": "2022-02-26T19:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T19:30:00",
						"endDateTime": "2022-02-26T20:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2072,
								"departureDateTime": "2022-02-26T19:30:00",
								"arrivalDateTime": "2022-02-26T20:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CznmCt28Cuz01bTLkUEsVrpGJkjJrGIPNPApNdq-cUGhegoVqGg29kkwZH3FHi5T0lo29FyygxK7_-XyodPddpQG3SK6_LRIbops7z_PX8xEFF75_Lf6sr2epyA6twFM0UWmhBWR5ixp0rXbdsGkOtspzLumEzfxJbSz5rUA9hLHgAGzsrVg4kQdOABWF_Haq4y3bS18tPn2K-woRbt5rDh1yG9738-94Nm-lPcYwV0r5KLYzokztSCu5k25dsYKmilclxrC4aQHJKr2qpS8q_WkBciVyvvQYHrFT_0hTIsacpT-tACvYeeVvpA2Yxo10WEofaCgjV6jUGZCfs90D3bTKqYzFPl8yAoHF3js6KLlqa8sBMmB2unlB9VcvsiTUPGCzpB43nINJssuYYYtl55rrcEafaEX-EL5Pba7aA8461Itu78Vp8qnMnddF9caNK5e1-zXk_IeDYRqPyh6xQA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "49adde09-fb31-49e4-bbab-2074f584c861",
		"departure": [
			{
				"departureDate": "2022-02-26T18:05",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:05:00",
						"endDateTime": "2022-02-26T19:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2006,
								"departureDateTime": "2022-02-26T18:05:00",
								"arrivalDateTime": "2022-02-26T19:20:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CoOfj8VzwnCXDeICsPeLm3gkRQvUsXg1Uy8yAgJFyIs_KWLJSy6dekLR8ARu7Cq8-GqVYVbr68F-zOaWyo_Tfm6BKXj4Mv1UndU2ushIghPeF8_TaFObYGmFHJLntRT31qy9VfKmHRO14kmJ8b6WZXT5rQfkn2gly1OKG43A8aPHqthJPT9qqnsv5hEBR-WFvKakR8ns4JcO_ZYlwEL-8WPqDfOgqySEHT4eciVnTrMT7Rkt55ihK99pRu0KOVhBo6IjqxCkY5I4v42kDhf4cu9g4bxg1R1c6PdQCX_6A-k_1UdttRuMW08DxRxT89Z4ceXpnePk2k0QnSlWZzFDEw0cU1bUh08sXeLDtLN9rinZqLWZTdl3X74uT1NotDUN_iXc2S8Bx6t101LgXlzVW0rOOCNR6-riVRPmO0H8-b_88sD55W1ReX-WoFoWZzn_gWV-ZgbwXrsfQJ76jtryz9Q=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "64a7881a-6267-4d51-a614-b7d606e94784",
		"departure": [
			{
				"departureDate": "2022-02-26T17:10",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:10:00",
						"endDateTime": "2022-02-26T18:25:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T17:10:00",
								"arrivalDateTime": "2022-02-26T18:25:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C38E4l1Q6WrqX90SSDTjp72gwIFtjM9l0foKBrJVgY-R-eAMxK8OifHI2uCJdquUg61RjcZ7m3aVcKc2txJKi1zbSR084RaJLrXaSU_EAtvyYDx7m6zrgZWUIUeTyqUJanpylzS3l25Vo7dVvSHA0QHyElsQuPEk30BYaffg0tw8JYibv3dhMY-K-20WWQYAt0d0gu4xG9niDebFqCVeYHDmUYJ-_I-dkic5rnx1Cl61dQpfXFILT-udJ_MD2eC76OdSh1scFmDAFZzw1z7eatUW9s9NmiTlhCoCj7g1gl6RO8wX7Vw8KE487NbfRCugITsmupU2GxvjJ3vWQlx1YJgxx-cLffjOdMZyP9E8vavIb-0TBoRcrF7echm6dYtn7JTM14gxkgQ7GWvkX1sfm_tnzYBu1Y5Wn6yxVsqvRBMJSmU--xwTfTpk0GAT2IDQrSQsHilQTT7HZygOfpTtPIg=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "cf363cee-ce4d-4480-b93a-bb6ae566e6ed",
		"departure": [
			{
				"departureDate": "2022-02-26T18:05",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:05:00",
						"endDateTime": "2022-02-26T19:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2006,
								"departureDateTime": "2022-02-26T18:05:00",
								"arrivalDateTime": "2022-02-26T19:20:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C_hgJvS2sM9-QXi4ElC7ad_JlIYufym-VOjbXjAp7I7OUMGrpgoa5mm07Sp-3WVYzOt1IWSGXGkMCG8RbCsHt1vp-9IadPOjdhHxZdTu3J9qwGpszIEXX3LM0jH2RCUgMWB2yHZqK1UwIpnuaGVJyzflBad7tt4xYnAPQ4Zkt9F-2czLjG-7aeaFBq3R5fGgNgC65SrgCTjDWDzrkClZWKTrb53ygSouU6gDb08KGPXjvsgxRPCNomlm7Qrlr8_v4TJBP0YRCMI5x_rH3lFdUd7_VQ350PDevK8P1GIsmDqPuNJTPg-JzLYYdMJKGVgRvXpNuUH6DT4llRhRNgeGSPbkuTJkUuzcjwIf1PTsmJaWi_g3WJERiaOm4sCKBsZ93XkWKPTAXpnioc3VaTHAi42tGCDa2GXrn5l_O5LHHcnoVugio0avCh1mzzAN3VIMz79UsZ_d-5FmIz-9hJw27MA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "bf4f76f3-fb72-4c3e-9b90-e244727ef494",
		"departure": [
			{
				"departureDate": "2022-02-26T18:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:30:00",
						"endDateTime": "2022-02-26T19:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2091,
								"departureDateTime": "2022-02-26T18:30:00",
								"arrivalDateTime": "2022-02-26T19:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C29oav6I5ucLQqQYmXlbY7YSY4jj8e1-ico1deSEx4bAPnOIR9ZH4Zl8mIVyQIZpXv-CwCSDQPw0jKwuUIjOUz27GdsbEIPk9SjMSK5Ms4_MXKulIeAdQdtRjJ4rn2snKYEVzkQJ5yN5e9nIpu5EgUqJ8m_-eBuBiDOu_gj1JzCmwYb2c8i9pNVYajI1PennwnTIpspjlXuasCMnlfOtGgxozL6-Tv52qMntkTHsQZEwrK2V-nwrq9StUXFqjieHP69xBJyneTIXK5JWBtOIcEEwad4MET_2ZKmxGUNH2qFPfl9BI5UVLPL_mQZPtuydxiUB30sdTf5Dwths_3eJtJCSzETyje-FHoupyU1OA0bY3mUH_2v22WUWLArbed1lRT3GnwEnHPDWMRzKplSViZNCV_6S9JLlkufQTeO1ZR4mUAYavcQ-TSoh5EMxQDgU50bq4Gv0G6oP76CSkzWINHg=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "95191927-4c1c-479f-9fa1-39b8cb49613e",
		"departure": [
			{
				"departureDate": "2022-02-26T17:10",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:10:00",
						"endDateTime": "2022-02-26T18:25:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T17:10:00",
								"arrivalDateTime": "2022-02-26T18:25:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CiwPeVingUIks-BPE37dTKLm48HA-yYe9IuLviDITi-8sYGEhthK6Y0Pzm2a3CknO6RCz8OfNdpambLYAg8vtNCLNUBROvSNUM2nCMnOtDdpGYbgqbc0-sSSFLrzEbsvjfecCmV32cWTnJZKaUrzeuorLoCLVSsiFWkd1nKmm5hNM-z9PnDiNxspTScQ4fw0FSFZDLXHXr-m0fVBuDJIg8aVm2z_Kpyl7vJRqMQlDZZwpOLcfuWuYlu8WX_7IYMYrZRrtCxci1h3a9YtaheE1WO4iPQYexgunX2GpCacQP9oN60rRqWfyIidk6ftDu1qR98MtmJnReEyjWNcyNDLlrWiGhtp6Kst1vQ6sZmPemM4F0tcgGapGEZvtv92mQ5BpMsoJYdgyn26RttxUKgZGxs__6ZBBZ-rxeirWAapvov4zG7bspbodlxhoHsrujGSuE3draJHV1ntyrtWxu9MTFA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "b433a236-2af8-4470-b62e-fe8a2a0ee0ec",
		"departure": [
			{
				"departureDate": "2022-02-26T16:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:30:00",
						"endDateTime": "2022-02-26T17:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T16:30:00",
								"arrivalDateTime": "2022-02-26T17:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "COfrObu4TepIsBuh1aIExbwZeAT2Sy0S42N0ZDIbh3pxHQ3q1DoYa-Gjr0y16m7EYsyF4JqvfpM5X83nLj2JtvMVTfqELZgmql-KVT9D9S4p_ZNqmyW3B3Xg18530tUJLij5I-2gzI1AAsMczyH-zmskfz4FeBJVfPmLyAtN414QLWe0UfrF0cFA6L8dXF6MebidwZ7Dt009zpSQzXur7uSzZQL1K_DB-NYB7MacG7Fn3fprw7RmA9sS0BS94uLhSPAlvoFLzyI_Q_R6FPQEXc0DN7AxaPTw_lUiMyjbDw0tNsx3v36xE4FNt6Wb5uGRPPdhJXfxWsKXGWqyqJz4pcwFAh_Mv3l0Z_Eiwct2zBFECB5l-bmNz5gBk7zuWyvvsIr-UdnHODp240vaeBGAC-tH9dgEuJ7jsKE5iNHXPTmGubAyBxHXTx8YsqMwl8aOpWW_1LOppDlEDFSUnEi6PQw=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "869b9eb4-77c0-4347-8bc9-161df3678421",
		"departure": [
			{
				"departureDate": "2022-02-26T19:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T19:30:00",
						"endDateTime": "2022-02-26T20:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2072,
								"departureDateTime": "2022-02-26T19:30:00",
								"arrivalDateTime": "2022-02-26T20:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C1eStdO1J3pXfYuG5SN9WrLTteqADRuAw3tsTmBh26_eCC0gp9pOv4XGsq9l3k7dJizad7Vsgen7ANBlSBUmZ99oweWx9EY4a1DCs2dFNjhDfGzlg0zx5Y-eI4SGQ7A3AowV7QWXGf8FnexcwQp4ciryVxodKJoziTd7T9BmOScafUiUDH94XG3TdI0Aud_pAa_IRQkI8aR26ONO0eGnyK9qcMjS9EN0Xlcgz3DgCs3oMC8tWjGdgB2bCU0V-MHR1WQxLgMtGYx23SXUvbkF66B4kNUXZdv1orpc14BByo_9pG0KOUGcztz0j7t3vcm5M0C8dgW89khb3WsXVcoiTEtnwTojUrS75HLIWVK1n0hE4rbPF4OLBwpW-c2s3SCf349hAlK3XZfICwhihkiNdMkAwjghKSDKnhFXdNfoXaAAYo1cE3qlrL8jtMEMX4LXvJgVZpanl6ODAFQ1-f9wJbw=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "0bce6542-8365-49fa-88d2-ea6bff9d9df3",
		"departure": [
			{
				"departureDate": "2022-02-26T19:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T19:30:00",
						"endDateTime": "2022-02-26T20:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2072,
								"departureDateTime": "2022-02-26T19:30:00",
								"arrivalDateTime": "2022-02-26T20:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CkCDVPtGvFN0hJgwNZ-21eEBHCTZTp0aljUF_GcD1vw8NKP3sYJ39K3uy89jNBALOHG3Vg4AFw54zdm8cXKdeF2NvkBbxy8BGGafz30bGUgvNNlbR09I0mOnsQAqQAXgiiN1QB76i0NObb6oZTRGu-cUXixeWhwayKhiEIzXpVfvhc8UANkvyetqkXdzjIGbPAk_2FdzpPn4WusTEauZJtBXA_vwvUjCCWbsjvfWgNkdZWKW-G67ltA5N41u1inuh8Gt3d5FBaaTUH4KfmS7sEal1gFpQHCzkUQhIVziMqxFhgk8S-31UlMHq6aXy_AUTtTOeNvfBTJoBfemSdkORR7mlG1s5CNQ3e94oae6nSu1KB4e1n0KwiEIVn0SuSsNr8FiO0CSSqYzRPzbr5NVQ5R-OQr6m4gguZm7bpa5muQcmKoL9v81mdx59qnHPMRl76E1-Tddmv9lXxg3WrFT-Rg=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "4281e703-d509-479d-aba4-7f33944a311c",
		"departure": [
			{
				"departureDate": "2022-02-26T16:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:30:00",
						"endDateTime": "2022-02-26T17:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T16:30:00",
								"arrivalDateTime": "2022-02-26T17:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CMPE__Uvt2orynGJaJ5TiCrVioZvoK1OSc-SaYVQ3uaXbV13EmPkWYYOf12VZ2F1V_nVU_jCelkO8tyuSGggVDH69F4DanvoEPMbIBoZbjZBDSImk9P94ut-GcdBNhZymB2STAsyljmlfvsuJ9VOKP9pa1EuUUcoUrarTp5tFAJCJlFbg-1rxoWJBAk9f3xjoJh-_JsuEA9gp5pbyb8wOwVDcztdxNUbHDPtf15noQFWnVHeOXkpwDlb9QPH6ho67C12Znkb5qJcqp-YiPLWoWcoNMOHer3-bml7Ms0ioNLmx2P7TpKDEWoWeo5SVqlokEUTcNZSzDqUe2B0mcVHY7QNaSjnbJAA9BPY-x7u-f6pcZ4n0ZwS0S1yf-QruGiSM8BxqRTyw3FTY7Fj-9607MdUbOK0VEsFGve7HurzyKKoieR934jeXJoZLwfYStQFsyRM2XqIDS1CXIg8Pd0ZAnA=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "8b1eb553-fc57-492b-8819-3ac4222d795e",
		"departure": [
			{
				"departureDate": "2022-02-26T18:30",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:30:00",
						"endDateTime": "2022-02-26T19:45:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2091,
								"departureDateTime": "2022-02-26T18:30:00",
								"arrivalDateTime": "2022-02-26T19:45:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CLUIzHRarf8r0UpD4k9a-7CLdVDTkUlyPHlHAIjd1xk--j5uTWwa6zzfbz8qvBYdKn_7r5zp0F-OnNrELMYqaRCD5mLPdXSCbTLm5XnvRS-9_4rIEOdUubydoycGfRWDhhR4r_620-c0OAUFJZXonY-MO629kR6DQFl_hBzh2fW0QEKbODeSMNcYdToHH6F6EFs6ROGifXY_vzFEVeVPQCuHIKbq2yOuzLTSNvHV5iJC5B-BlzFy3B89ycyDYZ2QYfFtCJ9VYysE04dQoDVk4N-ORlv0YtvPQqwgzycTXothZ-wMbVHK9LjgK_jH3O8OkEZxutZ-y8SUZGMdJ5pjNXsEpAofDDiZbW48_cXSwaDTjwql-I8kuHeUMa9D7No5aJrEbLIEf3QQnAXUy2OyH8R3q1Ue47H7r5rKIud_B3-3DDLjRCuPHnG-k_a3FdZgBf4pXqwpjLnKDn5CqguXvpw=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "7df17eb3-177f-4e4f-a8b7-39dab61efe82",
		"departure": [
			{
				"departureDate": "2022-02-26T18:05",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T18:05:00",
						"endDateTime": "2022-02-26T19:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "03:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2006,
								"departureDateTime": "2022-02-26T18:05:00",
								"arrivalDateTime": "2022-02-26T19:20:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN CHILE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 173,
							"taxes": 0,
							"totalFare": 91.05,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CGc4GT9wpIS8-G8X_zRH-D3xrTqtAwlDLhDoooh4UcUeOxYkCjm6oRU6NVwmmXkyv2j68duXdlwiFEAVPTVuirOdguGdPltLOYwmE37j0DTFP-kbx-csKOM6_XBmY4mTcx_JZBe3lS5DzGjf9VfS5SLO9Sln23i6sd2FGDQnx-DDtLE4iDzzKVKzwcSRLULBNYTTwtSDd65nbV3wKomcCtk9avUo1MkiK6JsSw-rVRQoJPePm5USmcvDVT-c0NT0asehEwho3OFFln-bB9YsLeNUJMGyCRljgw4qh6gF9EWnp3TZhvyccSZVCdcAh_z_ZdXAAKThZm4C9lXDBI13Rl-9XeZMgi8RFjtPXdo9b3YFJkO8BMUSowl1y6eUAxzXlQBIkdY_qKTWfAlX8iVQeHuEMRhifyFG2NDoC30T9NhkVceXZISak0_aAsG3Eq4aPYik049iWhzeUnYpfIog4uw=="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "fb2c51ec-e2a8-48fb-9382-b5b767b6952a",
		"departure": [
			{
				"departureDate": "2022-02-26T16:11",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:11:00",
						"endDateTime": "2022-02-26T17:38:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "15:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 613,
								"departureDateTime": "2022-02-26T16:11:00",
								"arrivalDateTime": "2022-02-26T17:38:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CdoMV9EUy2iynluHLGfQG0M-hrvk33hml1BFYxab7joiRN0lDlgK4g8JJIIm7KZ7rb65yOdD4wKBKt7vG1GHQNG4tj8pnnbFi2cJkxKNHmcRDlwf-ktb71uDV6Os_y0bC1L_aSHFST2JS0u17lztnlS6fkRwH47azz5UeVROtEDXZpIEJwnWNjdJWMbw_gjIRu3RgqHJqa0x4_OpCZvcFttD49pKj26Neb2JIwdsNREBjT6PVGmKFry3FIqMIybQhJ9YHPBki7hKcQQFqU5mOFDrd8nNaD1dDh6dLgn8ZNyJWxu1o2aePVe6gsLTQuba8equJIr7BrrcXogU3daUjN7-bAmym4DTcG0d413qOafn4mNbScxOU-RRgjr_TkmRZlqyQlBjVEK0dSfS6sVZxvEm_GEZR9US4eXR94SSk282bQcLtLhIj3tmxXtL0riaAgQZMDPf0AY1pGKFHcHYzazSrjTfVKNXwdLIMqW7kYjA="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "0089f2b6-a88d-42c6-9004-1aa9b2b1bb83",
		"departure": [
			{
				"departureDate": "2022-02-26T19:34",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T19:34:00",
						"endDateTime": "2022-02-26T21:01:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "15:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 603,
								"departureDateTime": "2022-02-26T19:34:00",
								"arrivalDateTime": "2022-02-26T21:01:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:05",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:05:00",
					"endDateTime": "2022-02-28T21:25:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "08:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2007,
							"departureDateTime": "2022-02-28T20:05:00",
							"arrivalDateTime": "2022-02-28T21:25:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C2HNUSBea7XOTx_qSKVuWoNIEtkV59uMigOiliyIeCxIYnpsQ-cmcfIOjt1D2kXBZudm4fnswgjPyyBYvoKjjssw2oR9i21BTafV4xnNn6Eih9fJ-FnwnW6Sv3hWwJ9CHJ_sjLQVEalONzSOQiIdAVv3hM60rMhFCX7A8wk7qiYB9i-hPIFsfSY67xcB33lLtzvXI43-CRTwnhQ3RPRH5DthhuMFqXGJ_fuchESBZfuJBoODVCTGdYjKFGO-CMMuSuUSv8Emv9SMevGPThmV0Cl10m3_vBK_Ipq4Seh5tVPH22tdp8UezdFomNvr5sykfXMTV-5y4Dt3sdUVjI-apB_4LiJaw9IVezFYt73-UJQyKfMBsngJIAlbk-5Ya9IQviXlejQ7JfM_lEPViMTU5S4F1qUoBQKI8EPrtMxkCCCiOCwjr30NE22sTSmG40O7De_EC6Y821tCf3j_cqvjCEKCFbBlXxL04WdJN02fCk00="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "e419b88f-c08b-4c37-829d-a732264c324e",
		"departure": [
			{
				"departureDate": "2022-02-26T19:34",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T19:34:00",
						"endDateTime": "2022-02-26T21:01:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "15:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 603,
								"departureDateTime": "2022-02-26T19:34:00",
								"arrivalDateTime": "2022-02-26T21:01:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CumbcPam4RRGZiG25B_8O4yHqHBksPburAc7uQ2duUlIcxdZdzvChW1XRpmJYIBffUCf1lYJol1KEV01cfO21Y-5I-afnma-l9TUAHmCCeTv9SWs2G2IrSmgYIHlgtUFR_ojbdG3ZfOXj5UL0xnnqx3UBLQl7gIqTxMupk0-tI0z95csejqWSfBSn1G0lY_EdzfJlKrgITQ7RBNOn5Drvbxj80lVnZLRTo4p4luE_8vAfgO8DzLg6FTN-hW1Uli5VJWJEcfVKqoQE7EVe2GClNN9JTdNhEHnXMhc9sYmO3L-h73H7tAzJRDB5bGxC-ZSFgPM9tznFHbTr6z4yC8DMZBy374-YT5Dfa8H-ZXhfbJdMO7qIdIhrTNe1EEnNg47Y8LA_rxehwd7mmw5X877W97YnA2MfZjb3tNcJF0uvtm46IWnWEn_YaVFzNX7LHaCXw31gbRXCACbDp_qipfaMFo4TZVpv3fYu2j4FEhuD5cY="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "0c0457ab-caab-4f5b-ba65-7c4ff800c3ca",
		"departure": [
			{
				"departureDate": "2022-02-26T16:11",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:11:00",
						"endDateTime": "2022-02-26T17:38:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "15:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 613,
								"departureDateTime": "2022-02-26T16:11:00",
								"arrivalDateTime": "2022-02-26T17:38:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T12:50",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T12:50:00",
					"endDateTime": "2022-02-28T14:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T12:50:00",
							"arrivalDateTime": "2022-02-28T14:15:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "C_eml4njQMSE5fmCt6sMyFa9TmGSW5ClLrILmzTRHO0UaTqiQXg7Z16N_SI7Dz07k-9GECog9LDxwlkqJHs3OoP4iJb6cqWSt2udgb4cd3oqdv81kkFPqIlNXw8J__AJAapNxjHB_WjepeTI4hs85sm9W9bE-3Cagn8dbt9TALfnMpIYGdiOmxwPDvWhwcHagAxRIWVa3Q3puSRy6s4wQFlm3LobEVnWIQF4Nl7m9PEnoKYjM73Ysxvj0QfScLDi-8m5IagVQ_S77x-a-BYYPEY-c9Vc9aUILdiAtQ8KiBuRpWhulhmZ9nUdDaByi1seui5-STA_ggZKroqX6ig0slAvXBu5dILqjPaIAXzfHOkjV-VHtSJ36FD3qYCM7jl5Yntz8okKtLIzosuO9WYpimeoOkcIwnMi3HhPl9g_9oc_F25NSOBSxs8UPkpPRuyjOeDEQA97x5tnNHB5i6mmw3UTOyIgdS35cTe32U5R_hlQ="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "45ec3a6b-93d0-413a-9257-5f217ae34689",
		"departure": [
			{
				"departureDate": "2022-02-26T16:11",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:11:00",
						"endDateTime": "2022-02-26T17:38:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "15:00",
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 613,
								"departureDateTime": "2022-02-26T16:11:00",
								"arrivalDateTime": "2022-02-26T17:38:00",
								"cabin": "M",
								"isReturn": true,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 0,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "No contiene",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T20:45",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:45:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "13:00",
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2090,
							"departureDateTime": "2022-02-28T20:45:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "M",
							"isReturn": true,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 0,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "No contiene",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN CHILE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "DEFINIR",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CH",
							"passengerTypeSearch": "CH",
							"fareType": ""
						},
						"fareBasisCodes": [
							{
								"code": "B2SO00NV",
								"cabin": "M"
							},
							{
								"code": "",
								"cabin": "M"
							}
						],
						"passengerFare": {
							"baseFare": 178,
							"taxes": 0,
							"totalFare": 91.17,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "5",
			"webSessionID": "1",
			"esFlyAndDrive": false
		},
		"kiwiBooking": {
			"token": "CcydcWsu_AKbZsUHBE5PX8DJ4pSwKQgtgT0cCIeVRzyme3mTgwmKCTMPmTwz-NVAmbv-L0nskVGYMzp7EkOtEcc5Xt0-VFEvkNX6x7APMTEBx4qs8jFjrkn7rCcXUD2ac8WPy1egiud_H8Ky1dk4xxodxi7R9DMq90zh3YXWtwwz7sedp-4T7NkuSkQT8Gd15c2U1s1v9126s-9-Tc5zeO8dRC7pp5myMV6Q3oGLtUotS3UV1ElZZjYn8myf-2SfoNZ70J67oQlPwPRWGjcEst4Z6nGZtFQw0O5xbwUayDYcPudQDdOdxwgI2XpeoaOcsnxC-YsfhF0xgVT7PfmCs7S2eSCUIBpMeFt-JPjRSNcLd_g3_51ulh0RFyJH-LKPzTNWqGx7yiW7cFtXl3HJJ5WOq4G1PYmiu8JVLYGjisLOJy4132O7NiSSkBvq4UPPtF68QaCS9Jd1SA0ej5oc6jU8NNW_tfumTSq7BBWQTJfo="
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "3444be21-e922-42c5-8278-e1a87fdbf05a",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00",
						"endDateTime": "2022-02-26T14:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:20",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00",
								"arrivalDateTime": "2022-02-26T14:20:00",
								"cabin": "Z",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T20:40:00",
					"endDateTime": "2022-02-28T22:10:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5084,
							"departureDateTime": "2022-02-28T20:40:00",
							"arrivalDateTime": "2022-02-28T22:10:00",
							"cabin": "Z",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 66.0,
							"taxes": 27.68,
							"totalFare": 93.68,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 66.0,
							"taxes": 27.68,
							"totalFare": 93.68,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "78973ed9-2340-46a0-8795-c884c690ac1f",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T05:30:00",
						"endDateTime": "2022-02-26T06:55:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:30:00",
								"arrivalDateTime": "2022-02-26T06:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T20:30:00",
						"endDateTime": "2022-02-26T21:55:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5081,
								"departureDateTime": "2022-02-26T20:30:00",
								"arrivalDateTime": "2022-02-26T21:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T15:05:00",
					"endDateTime": "2022-02-28T16:35:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5012,
							"departureDateTime": "2022-02-28T15:05:00",
							"arrivalDateTime": "2022-02-28T16:35:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "ea0255f0-69ae-40d9-923d-d585a74bdbb8",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T05:30:00",
						"endDateTime": "2022-02-26T06:55:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:30:00",
								"arrivalDateTime": "2022-02-26T06:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T20:30:00",
						"endDateTime": "2022-02-26T21:55:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5081,
								"departureDateTime": "2022-02-26T20:30:00",
								"arrivalDateTime": "2022-02-26T21:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T19:45:00",
					"endDateTime": "2022-02-28T21:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5080,
							"departureDateTime": "2022-02-28T19:45:00",
							"arrivalDateTime": "2022-02-28T21:15:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "a964a4cd-a787-42b2-bbb8-95b8c2804a75",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:35:00",
						"endDateTime": "2022-02-26T19:00:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00",
								"arrivalDateTime": "2022-02-26T19:00:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 6,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T15:05:00",
					"endDateTime": "2022-02-28T16:35:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5012,
							"departureDateTime": "2022-02-28T15:05:00",
							"arrivalDateTime": "2022-02-28T16:35:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 6,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "5875c7c5-2416-4ca8-8641-699e3d605562",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:35:00",
						"endDateTime": "2022-02-26T19:00:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00",
								"arrivalDateTime": "2022-02-26T19:00:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 6,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T19:45:00",
					"endDateTime": "2022-02-28T21:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5080,
							"departureDateTime": "2022-02-28T19:45:00",
							"arrivalDateTime": "2022-02-28T21:15:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 6,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 67.0,
							"taxes": 27.88,
							"totalFare": 94.88,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "aa7cbbde-6508-4c2d-8b2b-0f53a73c9976",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T15:41:00",
						"endDateTime": "2022-02-26T17:02:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:21",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 607,
								"departureDateTime": "2022-02-26T15:41:00",
								"arrivalDateTime": "2022-02-26T17:02:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T07:26:00",
					"endDateTime": "2022-02-28T08:52:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:26",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 604,
							"departureDateTime": "2022-02-28T07:26:00",
							"arrivalDateTime": "2022-02-28T08:52:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 9,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							},
							"marketingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "VV",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "GBAOWGV",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 69.0,
							"taxes": 28.18,
							"totalFare": 97.18,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "GBAOWGV",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 69.0,
							"taxes": 28.18,
							"totalFare": 97.18,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "35be2c08-df6a-490f-87ed-63cc436c9eb4",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00",
						"endDateTime": "2022-02-26T14:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:20",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00",
								"arrivalDateTime": "2022-02-26T14:20:00",
								"cabin": "Z",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T15:05:00",
					"endDateTime": "2022-02-28T16:35:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5012,
							"departureDateTime": "2022-02-28T15:05:00",
							"arrivalDateTime": "2022-02-28T16:35:00",
							"cabin": "Z",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 71.0,
							"taxes": 28.58,
							"totalFare": 99.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 71.0,
							"taxes": 28.58,
							"totalFare": 99.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "e46072af-8f61-4a2a-8e47-6499d8903123",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00",
						"endDateTime": "2022-02-26T14:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:20",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00",
								"arrivalDateTime": "2022-02-26T14:20:00",
								"cabin": "Z",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T19:45:00",
					"endDateTime": "2022-02-28T21:15:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5080,
							"departureDateTime": "2022-02-28T19:45:00",
							"arrivalDateTime": "2022-02-28T21:15:00",
							"cabin": "Z",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 71.0,
							"taxes": 28.58,
							"totalFare": 99.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 71.0,
							"taxes": 28.58,
							"totalFare": 99.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "470ec8cd-d5e1-40ad-8630-e1554f18b329",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T05:30:00",
						"endDateTime": "2022-02-26T06:55:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:30:00",
								"arrivalDateTime": "2022-02-26T06:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T20:30:00",
						"endDateTime": "2022-02-26T21:55:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5081,
								"departureDateTime": "2022-02-26T20:30:00",
								"arrivalDateTime": "2022-02-26T21:55:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T11:35:00",
					"endDateTime": "2022-02-28T13:05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5502,
							"departureDateTime": "2022-02-28T11:35:00",
							"arrivalDateTime": "2022-02-28T13:05:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 85.0,
							"taxes": 31.08,
							"totalFare": 116.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 85.0,
							"taxes": 31.08,
							"totalFare": 116.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "76036eef-f15c-4168-90b0-2be1c51934ce",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T17:35:00",
						"endDateTime": "2022-02-26T19:00:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:25",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00",
								"arrivalDateTime": "2022-02-26T19:00:00",
								"cabin": "X",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 6,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T11:35:00",
					"endDateTime": "2022-02-28T13:05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5502,
							"departureDateTime": "2022-02-28T11:35:00",
							"arrivalDateTime": "2022-02-28T13:05:00",
							"cabin": "X",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 6,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 85.0,
							"taxes": 31.08,
							"totalFare": 116.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "XZERO",
								"cabin": "X"
							}
						],
						"passengerFare": {
							"baseFare": 85.0,
							"taxes": 31.08,
							"totalFare": 116.08,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "ce5074a9-31ad-48e4-8a9b-ad02b6084615",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00",
						"endDateTime": "2022-02-26T14:20:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:20",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00",
								"arrivalDateTime": "2022-02-26T14:20:00",
								"cabin": "Z",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 5,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"name": "transportator not found"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "SKY AIRLINE"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T11:35:00",
					"endDateTime": "2022-02-28T13:05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5502,
							"departureDateTime": "2022-02-28T11:35:00",
							"arrivalDateTime": "2022-02-28T13:05:00",
							"cabin": "Z",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 5,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"name": "transportator not found"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "SKY AIRLINE"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 89.0,
							"taxes": 31.78,
							"totalFare": 120.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "ZZERO",
								"cabin": "Z"
							}
						],
						"passengerFare": {
							"baseFare": 89.0,
							"taxes": 31.78,
							"totalFare": 120.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "4f7f8db6-6574-48b8-94e4-9c771294ec23",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T16:11:00",
						"endDateTime": "2022-02-26T17:38:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:27",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 613,
								"departureDateTime": "2022-02-26T16:11:00",
								"arrivalDateTime": "2022-02-26T17:38:00",
								"cabin": "B",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:34:00",
						"endDateTime": "2022-02-26T21:01:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01:27",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 603,
								"departureDateTime": "2022-02-26T19:34:00",
								"arrivalDateTime": "2022-02-26T21:01:00",
								"cabin": "B",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T11:29:00",
					"endDateTime": "2022-02-28T12:59:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 600,
							"departureDateTime": "2022-02-28T11:29:00",
							"arrivalDateTime": "2022-02-28T12:59:00",
							"cabin": "B",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 9,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							},
							"marketingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "VV",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "BBAOWGV",
								"cabin": "B"
							}
						],
						"passengerFare": {
							"baseFare": 91.0,
							"taxes": 32.18,
							"totalFare": 123.18,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "BBAOWGV",
								"cabin": "B"
							}
						],
						"passengerFare": {
							"baseFare": 91.0,
							"taxes": 32.18,
							"totalFare": 123.18,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 1,
		"lowCost": false,
		"promoWeb": "",
		"esOnline": true,
		"id": "035aa0dd-bc92-4460-a4bd-d65e0054c392",
		"airline": {
			"code": "H2",
			"name": "Sky Airline",
			"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
		},
		"departure": [
			{
				"departureDate": "2022-02-26T13:00:00-05:00",
				"originCity": {
					"code": "LIM",
					"name": "LIMA",
					"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
					"country": "PE",
					"continent": "SA"
				},
				"destinationCity": {
					"code": "LIM",
					"name": "CUSCO",
					"airport": "Cusco",
					"country": "PE",
					"continent": "SA"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00-05:00",
						"endDateTime": "2022-02-26T14:20:00-05:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00-05:00",
								"arrivalDateTime": "2022-02-26T14:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 1,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:35:00-05:00",
						"endDateTime": "2022-02-26T19:00:00-05:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01.25",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00-05:00",
								"arrivalDateTime": "2022-02-26T19:00:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 2,
								"elapsedTime": "01.25",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T05:15:00-05:00",
						"endDateTime": "2022-02-26T06:40:00-05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01.25",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:15:00-05:00",
								"arrivalDateTime": "2022-02-26T06:40:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 3,
								"elapsedTime": "01.25",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T15:05:00-05:00",
			"originCity": {
				"code": "CUZ",
				"name": "CUSCO",
				"airport": "Cusco",
				"country": "PE",
				"continent": "SA"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "LIMA",
				"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
				"country": "PE",
				"continent": "SA"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T15:05:00-05:00",
					"endDateTime": "2022-02-28T16:35:00-05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5012,
							"departureDateTime": "2022-02-28T15:05:00-05:00",
							"arrivalDateTime": "2022-02-28T16:35:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 1,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T19:45:00-05:00",
					"endDateTime": "2022-02-28T21:15:00-05:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5080,
							"departureDateTime": "2022-02-28T19:45:00-05:00",
							"arrivalDateTime": "2022-02-28T21:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 2,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T11:35:00-05:00",
					"endDateTime": "2022-02-28T13:05:00-05:00",
					"stops": 0,
					"segmentId": 2,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5602,
							"departureDateTime": "2022-02-28T11:35:00-05:00",
							"arrivalDateTime": "2022-02-28T13:05:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 3,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 94,
							"taxes": 32.7,
							"totalFare": 126.7,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 1,
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Bolso de mano"
									}
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 1,
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Bolso de mano"
									}
								}
							]
						}
					},
					{
						"passengerType": {
							"code": "CNN",
							"quantity": 1,
							"equivalentCode": "CNN",
							"passengerTypeSearch": "CNN"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 94,
							"taxes": 32.7,
							"totalFare": 126.7,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 1
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 1
								}
							]
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"origenSearch": "AllGds",
			"idGDS": "1",
			"idLogSearch": "T1RLAQIVoucn1rI/cNaqOgbQea48hr9xdxDM4HM9///+NLQy94ZSKKUEAADQKOgmbgcnpNhYG/ULf87UF2IiXIPpJ5lQcblCv7tfjI3rQzDWK9JpzUQ2kpk5vGnudk16oBJ4tXQbfj9cFiareVH+2ANQqeaWOCAnXukfGcfgPeU5gb6zQB9avKX/FuK61W//3cO1dwwZeyif5LJyJS7McuzVelFz+gopw/6xVTfyvdO4Y7hK93aWmO5+uBRrCYIWJu1iczEZ/8YtgVFu8SAPvLMxNSEpeuICu85mN8L4GDbOoGJr6XZFJl37MLuxEpKYrDXLl8mtTIo8Jwi3jw**",
			"webSessionID": "1",
			"pcc": "5KG5",
			"esFlyAndDrive": false,
			"searchDate": "2022-01-07T13:24:14"
		},
		"validate": {
			"tarifaTotalAdulto": "126.7",
			"tarifaNetaAdulto": "94",
			"listaClases": "A;A",
			"lineaAereaValidadora": "H2",
			"impuestos": "32.7"
		}
	},
	{
		"sequenceNumber": 0,
		"lowCost": false,
		"esOnline": true,
		"id": "13889516-a25e-4539-87d2-a20d8dd1cfe4",
		"departure": [
			{
				"departureDate": "26-02-2022",
				"originCity": {
					"code": "LIM",
					"name": "Lima",
					"country": "PE",
					"continent": "01"
				},
				"destinationCity": {
					"code": "CUZ",
					"name": "Cusco",
					"country": "PE",
					"continent": "01"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T15:41:00",
						"endDateTime": "2022-02-26T17:02:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01:21",
						"duracionVuelo": "0",
						"equipaje": {
							"piezas": 0
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 607,
								"departureDateTime": "2022-02-26T15:41:00",
								"arrivalDateTime": "2022-02-26T17:02:00",
								"cabin": "G",
								"isReturn": false,
								"rph": 0,
								"idFlightSegment": 0,
								"seatsRemaining": 9,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "Lima"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								},
								"marketingAirline": {
									"code": "VV",
									"name": "VIVA AIRLINES PERU S.A.C"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "28-02-2022",
			"originCity": {
				"code": "CUZ",
				"name": "Cusco",
				"country": "PE",
				"continent": "01"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "Lima",
				"country": "PE",
				"continent": "01"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T11:29:00",
					"endDateTime": "2022-02-28T12:59:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01:30",
					"duracionVuelo": "0",
					"equipaje": {
						"piezas": 0
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 600,
							"departureDateTime": "2022-02-28T11:29:00",
							"arrivalDateTime": "2022-02-28T12:59:00",
							"cabin": "G",
							"isReturn": false,
							"rph": 0,
							"idFlightSegment": 0,
							"seatsRemaining": 9,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "Lima"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							},
							"marketingAirline": {
								"code": "VV",
								"name": "VIVA AIRLINES PERU S.A.C"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "VV",
				"fareFamily": "Falta",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "GBAOWGV",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 98.0,
							"taxes": 33.38,
							"totalFare": 131.38,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					},
					{
						"passengerType": {
							"code": "CH",
							"quantity": 1,
							"equivalentCode": "CHD",
							"passengerTypeSearch": "CHD",
							"fareType": "RP"
						},
						"fareBasisCodes": [
							{
								"code": "GBAOWGV",
								"cabin": "G"
							}
						],
						"passengerFare": {
							"baseFare": 98.0,
							"taxes": 33.38,
							"totalFare": 131.38,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"idGDS": "0",
			"webSessionID": "1",
			"officeId": "LIMPE31ZS",
			"esFlyAndDrive": false
		}
	},
	{
		"sequenceNumber": 3,
		"lowCost": false,
		"promoWeb": "",
		"esOnline": true,
		"id": "a2b10310-7b2a-48a1-b4e4-905683fcb476",
		"airline": {
			"code": "LA",
			"name": "LAN Airlines",
			"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
		},
		"departure": [
			{
				"departureDate": "2022-02-26T11:50:00-05:00",
				"originCity": {
					"code": "LIM",
					"name": "LIMA",
					"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
					"country": "PE",
					"continent": "SA"
				},
				"destinationCity": {
					"code": "LIM",
					"name": "CUSCO",
					"airport": "Cusco",
					"country": "PE",
					"continent": "SA"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T11:50:00-05:00",
						"endDateTime": "2022-02-26T13:10:00-05:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2019,
								"departureDateTime": "2022-02-26T11:50:00-05:00",
								"arrivalDateTime": "2022-02-26T13:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 4,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:00:00-05:00",
						"endDateTime": "2022-02-26T20:20:00-05:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2033,
								"departureDateTime": "2022-02-26T19:00:00-05:00",
								"arrivalDateTime": "2022-02-26T20:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 5,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:15:00-05:00",
						"endDateTime": "2022-02-26T15:35:00-05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T14:15:00-05:00",
								"arrivalDateTime": "2022-02-26T15:35:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 8,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:30:00-05:00",
						"endDateTime": "2022-02-26T15:50:00-05:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T14:30:00-05:00",
								"arrivalDateTime": "2022-02-26T15:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 11,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T15:55:00-05:00",
						"endDateTime": "2022-02-26T17:15:00-05:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2025,
								"departureDateTime": "2022-02-26T15:55:00-05:00",
								"arrivalDateTime": "2022-02-26T17:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 14,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:10:00-05:00",
						"endDateTime": "2022-02-26T18:30:00-05:00",
						"stops": 0,
						"segmentId": 5,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2027,
								"departureDateTime": "2022-02-26T17:10:00-05:00",
								"arrivalDateTime": "2022-02-26T18:30:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 17,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:40:00-05:00",
						"endDateTime": "2022-02-26T20:00:00-05:00",
						"stops": 0,
						"segmentId": 6,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2029,
								"departureDateTime": "2022-02-26T18:40:00-05:00",
								"arrivalDateTime": "2022-02-26T20:00:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 20,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:55:00-05:00",
						"endDateTime": "2022-02-26T19:15:00-05:00",
						"stops": 0,
						"segmentId": 7,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2031,
								"departureDateTime": "2022-02-26T17:55:00-05:00",
								"arrivalDateTime": "2022-02-26T19:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 24,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:00:00-05:00",
						"endDateTime": "2022-02-26T09:20:00-05:00",
						"stops": 0,
						"segmentId": 8,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2009,
								"departureDateTime": "2022-02-26T08:00:00-05:00",
								"arrivalDateTime": "2022-02-26T09:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 27,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T04:30:00-05:00",
						"endDateTime": "2022-02-26T05:50:00-05:00",
						"stops": 0,
						"segmentId": 9,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2001,
								"departureDateTime": "2022-02-26T04:30:00-05:00",
								"arrivalDateTime": "2022-02-26T05:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 28,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T05:30:00-05:00",
						"endDateTime": "2022-02-26T06:50:00-05:00",
						"stops": 0,
						"segmentId": 10,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2003,
								"departureDateTime": "2022-02-26T05:30:00-05:00",
								"arrivalDateTime": "2022-02-26T06:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 30,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T06:30:00-05:00",
						"endDateTime": "2022-02-26T07:50:00-05:00",
						"stops": 0,
						"segmentId": 11,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2005,
								"departureDateTime": "2022-02-26T06:30:00-05:00",
								"arrivalDateTime": "2022-02-26T07:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 32,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T07:20:00-05:00",
						"endDateTime": "2022-02-26T08:40:00-05:00",
						"stops": 0,
						"segmentId": 12,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2007,
								"departureDateTime": "2022-02-26T07:20:00-05:00",
								"arrivalDateTime": "2022-02-26T08:40:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 35,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T11:00:00-05:00",
						"endDateTime": "2022-02-26T12:20:00-05:00",
						"stops": 0,
						"segmentId": 13,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2017,
								"departureDateTime": "2022-02-26T11:00:00-05:00",
								"arrivalDateTime": "2022-02-26T12:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 39,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:50:00-05:00",
						"endDateTime": "2022-02-26T10:10:00-05:00",
						"stops": 0,
						"segmentId": 14,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2011,
								"departureDateTime": "2022-02-26T08:50:00-05:00",
								"arrivalDateTime": "2022-02-26T10:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 40,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T09:50:00-05:00",
						"endDateTime": "2022-02-26T11:10:00-05:00",
						"stops": 0,
						"segmentId": 15,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2013,
								"departureDateTime": "2022-02-26T09:50:00-05:00",
								"arrivalDateTime": "2022-02-26T11:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 43,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T10:25:00-05:00",
						"endDateTime": "2022-02-26T11:45:00-05:00",
						"stops": 0,
						"segmentId": 16,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 1,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2015,
								"departureDateTime": "2022-02-26T10:25:00-05:00",
								"arrivalDateTime": "2022-02-26T11:45:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 46,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T13:45:00-05:00",
			"originCity": {
				"code": "CUZ",
				"name": "CUSCO",
				"airport": "Cusco",
				"country": "PE",
				"continent": "SA"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "LIMA",
				"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
				"country": "PE",
				"continent": "SA"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2012,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 4,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T19:10:00-05:00",
					"endDateTime": "2022-02-28T20:35:00-05:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2028,
							"departureDateTime": "2022-02-28T19:10:00-05:00",
							"arrivalDateTime": "2022-02-28T20:35:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 5,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 2,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2020,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 6,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:00:00-05:00",
					"endDateTime": "2022-02-28T16:25:00-05:00",
					"stops": 0,
					"segmentId": 3,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2036,
							"departureDateTime": "2022-02-28T15:00:00-05:00",
							"arrivalDateTime": "2022-02-28T16:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 7,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:05:00-05:00",
					"endDateTime": "2022-02-28T16:30:00-05:00",
					"stops": 0,
					"segmentId": 4,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2014,
							"departureDateTime": "2022-02-28T15:05:00-05:00",
							"arrivalDateTime": "2022-02-28T16:30:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 9,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:50:00-05:00",
					"endDateTime": "2022-02-28T17:15:00-05:00",
					"stops": 0,
					"segmentId": 5,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2022,
							"departureDateTime": "2022-02-28T15:50:00-05:00",
							"arrivalDateTime": "2022-02-28T17:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 12,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T16:45:00-05:00",
					"endDateTime": "2022-02-28T18:10:00-05:00",
					"stops": 0,
					"segmentId": 6,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2024,
							"departureDateTime": "2022-02-28T16:45:00-05:00",
							"arrivalDateTime": "2022-02-28T18:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 16,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T17:50:00-05:00",
					"endDateTime": "2022-02-28T19:15:00-05:00",
					"stops": 0,
					"segmentId": 7,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2026,
							"departureDateTime": "2022-02-28T17:50:00-05:00",
							"arrivalDateTime": "2022-02-28T19:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 19,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:35:00-05:00",
					"endDateTime": "2022-02-28T22:00:00-05:00",
					"stops": 0,
					"segmentId": 8,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2030,
							"departureDateTime": "2022-02-28T20:35:00-05:00",
							"arrivalDateTime": "2022-02-28T22:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 21,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:00:00-05:00",
					"endDateTime": "2022-02-28T21:25:00-05:00",
					"stops": 0,
					"segmentId": 9,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2032,
							"departureDateTime": "2022-02-28T20:00:00-05:00",
							"arrivalDateTime": "2022-02-28T21:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 22,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:55:00-05:00",
					"endDateTime": "2022-02-28T22:20:00-05:00",
					"stops": 0,
					"segmentId": 10,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2034,
							"departureDateTime": "2022-02-28T20:55:00-05:00",
							"arrivalDateTime": "2022-02-28T22:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 23,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:55:00-05:00",
					"endDateTime": "2022-02-28T11:20:00-05:00",
					"stops": 0,
					"segmentId": 11,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2010,
							"departureDateTime": "2022-02-28T09:55:00-05:00",
							"arrivalDateTime": "2022-02-28T11:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 27,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T06:40:00-05:00",
					"endDateTime": "2022-02-28T08:05:00-05:00",
					"stops": 0,
					"segmentId": 12,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2002,
							"departureDateTime": "2022-02-28T06:40:00-05:00",
							"arrivalDateTime": "2022-02-28T08:05:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 28,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T07:35:00-05:00",
					"endDateTime": "2022-02-28T09:00:00-05:00",
					"stops": 0,
					"segmentId": 13,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2004,
							"departureDateTime": "2022-02-28T07:35:00-05:00",
							"arrivalDateTime": "2022-02-28T09:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 29,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T08:50:00-05:00",
					"endDateTime": "2022-02-28T10:15:00-05:00",
					"stops": 0,
					"segmentId": 14,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2006,
							"departureDateTime": "2022-02-28T08:50:00-05:00",
							"arrivalDateTime": "2022-02-28T10:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 34,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:30:00-05:00",
					"endDateTime": "2022-02-28T10:55:00-05:00",
					"stops": 0,
					"segmentId": 15,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2008,
							"departureDateTime": "2022-02-28T09:30:00-05:00",
							"arrivalDateTime": "2022-02-28T10:55:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 36,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T12:25:00-05:00",
					"endDateTime": "2022-02-28T13:50:00-05:00",
					"stops": 0,
					"segmentId": 16,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2016,
							"departureDateTime": "2022-02-28T12:25:00-05:00",
							"arrivalDateTime": "2022-02-28T13:50:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 42,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:00:00-05:00",
					"endDateTime": "2022-02-28T14:25:00-05:00",
					"stops": 0,
					"segmentId": 17,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 1,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T13:00:00-05:00",
							"arrivalDateTime": "2022-02-28T14:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 45,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 98,
							"taxes": 33.42,
							"totalFare": 131.42,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 1,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 1,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								}
							]
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 98,
							"taxes": 33.42,
							"totalFare": 131.42,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 1,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 1,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								}
							]
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"origenSearch": "AllGds",
			"idGDS": "1",
			"idLogSearch": "T1RLAQIVoucn1rI/cNaqOgbQea48hr9xdxDM4HM9///+NLQy94ZSKKUEAADQKOgmbgcnpNhYG/ULf87UF2IiXIPpJ5lQcblCv7tfjI3rQzDWK9JpzUQ2kpk5vGnudk16oBJ4tXQbfj9cFiareVH+2ANQqeaWOCAnXukfGcfgPeU5gb6zQB9avKX/FuK61W//3cO1dwwZeyif5LJyJS7McuzVelFz+gopw/6xVTfyvdO4Y7hK93aWmO5+uBRrCYIWJu1iczEZ/8YtgVFu8SAPvLMxNSEpeuICu85mN8L4GDbOoGJr6XZFJl37MLuxEpKYrDXLl8mtTIo8Jwi3jw**",
			"webSessionID": "1",
			"pcc": "5KG5",
			"esFlyAndDrive": false,
			"searchDate": "2022-01-07T13:24:14"
		},
		"validate": {
			"tarifaTotalAdulto": "131.42",
			"tarifaNetaAdulto": "98",
			"listaClases": "A;A",
			"lineaAereaValidadora": "LA",
			"impuestos": "33.42"
		}
	},
	{
		"sequenceNumber": 2,
		"lowCost": false,
		"promoWeb": "",
		"esOnline": true,
		"id": "ebd1392d-4f02-4139-b8ea-e112459c0a14",
		"airline": {
			"code": "H2",
			"name": "Sky Airline",
			"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
		},
		"departure": [
			{
				"departureDate": "2022-02-26T13:00:00-05:00",
				"originCity": {
					"code": "LIM",
					"name": "LIMA",
					"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
					"country": "PE",
					"continent": "SA"
				},
				"destinationCity": {
					"code": "LIM",
					"name": "CUSCO",
					"airport": "Cusco",
					"country": "PE",
					"continent": "SA"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T13:00:00-05:00",
						"endDateTime": "2022-02-26T14:20:00-05:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5011,
								"departureDateTime": "2022-02-26T13:00:00-05:00",
								"arrivalDateTime": "2022-02-26T14:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 1,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:35:00-05:00",
						"endDateTime": "2022-02-26T19:00:00-05:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01.25",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5079,
								"departureDateTime": "2022-02-26T17:35:00-05:00",
								"arrivalDateTime": "2022-02-26T19:00:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 2,
								"elapsedTime": "01.25",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T05:15:00-05:00",
						"endDateTime": "2022-02-26T06:40:00-05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01.25",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Bolso de mano"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 5007,
								"departureDateTime": "2022-02-26T05:15:00-05:00",
								"arrivalDateTime": "2022-02-26T06:40:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 3,
								"elapsedTime": "01.25",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								},
								"marketingAirline": {
									"code": "H2",
									"name": "Sky Airline",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T15:05:00-05:00",
			"originCity": {
				"code": "CUZ",
				"name": "CUSCO",
				"airport": "Cusco",
				"country": "PE",
				"continent": "SA"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "LIMA",
				"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
				"country": "PE",
				"continent": "SA"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T15:05:00-05:00",
					"endDateTime": "2022-02-28T16:35:00-05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5012,
							"departureDateTime": "2022-02-28T15:05:00-05:00",
							"arrivalDateTime": "2022-02-28T16:35:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 1,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T19:45:00-05:00",
					"endDateTime": "2022-02-28T21:15:00-05:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5080,
							"departureDateTime": "2022-02-28T19:45:00-05:00",
							"arrivalDateTime": "2022-02-28T21:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 2,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T11:35:00-05:00",
					"endDateTime": "2022-02-28T13:05:00-05:00",
					"stops": 0,
					"segmentId": 2,
					"flightDuration": "01.30",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Bolso de mano"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 5602,
							"departureDateTime": "2022-02-28T11:35:00-05:00",
							"arrivalDateTime": "2022-02-28T13:05:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 3,
							"elapsedTime": "01.30",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							},
							"marketingAirline": {
								"code": "H2",
								"name": "Sky Airline",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosH2.gif"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "H2",
				"fareFamily": "",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 108,
							"taxes": 35.22,
							"totalFare": 143.22,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 2,
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Bolso de mano"
									}
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 2,
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Bolso de mano"
									}
								}
							]
						}
					},
					{
						"passengerType": {
							"code": "CNN",
							"quantity": 1,
							"equivalentCode": "CNN",
							"passengerTypeSearch": "CNN"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 108,
							"taxes": 35.22,
							"totalFare": 143.22,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 2
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 2
								}
							]
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"origenSearch": "AllGds",
			"idGDS": "1",
			"idLogSearch": "T1RLAQIVoucn1rI/cNaqOgbQea48hr9xdxDM4HM9///+NLQy94ZSKKUEAADQKOgmbgcnpNhYG/ULf87UF2IiXIPpJ5lQcblCv7tfjI3rQzDWK9JpzUQ2kpk5vGnudk16oBJ4tXQbfj9cFiareVH+2ANQqeaWOCAnXukfGcfgPeU5gb6zQB9avKX/FuK61W//3cO1dwwZeyif5LJyJS7McuzVelFz+gopw/6xVTfyvdO4Y7hK93aWmO5+uBRrCYIWJu1iczEZ/8YtgVFu8SAPvLMxNSEpeuICu85mN8L4GDbOoGJr6XZFJl37MLuxEpKYrDXLl8mtTIo8Jwi3jw**",
			"webSessionID": "1",
			"pcc": "5KG5",
			"esFlyAndDrive": false,
			"searchDate": "2022-01-07T13:24:14"
		},
		"validate": {
			"tarifaTotalAdulto": "143.22",
			"tarifaNetaAdulto": "108",
			"listaClases": "A;A",
			"lineaAereaValidadora": "H2",
			"impuestos": "35.22"
		}
	},
	{
		"sequenceNumber": 5,
		"lowCost": false,
		"promoWeb": "",
		"esOnline": true,
		"id": "6f69fbee-0b24-4bf7-bf0a-947b00d560e6",
		"airline": {
			"code": "LA",
			"name": "LAN Airlines",
			"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
		},
		"departure": [
			{
				"departureDate": "2022-02-26T11:50:00-05:00",
				"originCity": {
					"code": "LIM",
					"name": "LIMA",
					"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
					"country": "PE",
					"continent": "SA"
				},
				"destinationCity": {
					"code": "LIM",
					"name": "CUSCO",
					"airport": "Cusco",
					"country": "PE",
					"continent": "SA"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T11:50:00-05:00",
						"endDateTime": "2022-02-26T13:10:00-05:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2019,
								"departureDateTime": "2022-02-26T11:50:00-05:00",
								"arrivalDateTime": "2022-02-26T13:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 4,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:00:00-05:00",
						"endDateTime": "2022-02-26T20:20:00-05:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2033,
								"departureDateTime": "2022-02-26T19:00:00-05:00",
								"arrivalDateTime": "2022-02-26T20:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 5,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:15:00-05:00",
						"endDateTime": "2022-02-26T15:35:00-05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T14:15:00-05:00",
								"arrivalDateTime": "2022-02-26T15:35:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 8,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:30:00-05:00",
						"endDateTime": "2022-02-26T15:50:00-05:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T14:30:00-05:00",
								"arrivalDateTime": "2022-02-26T15:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 11,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T15:55:00-05:00",
						"endDateTime": "2022-02-26T17:15:00-05:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2025,
								"departureDateTime": "2022-02-26T15:55:00-05:00",
								"arrivalDateTime": "2022-02-26T17:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 14,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:10:00-05:00",
						"endDateTime": "2022-02-26T18:30:00-05:00",
						"stops": 0,
						"segmentId": 5,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2027,
								"departureDateTime": "2022-02-26T17:10:00-05:00",
								"arrivalDateTime": "2022-02-26T18:30:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 17,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:40:00-05:00",
						"endDateTime": "2022-02-26T20:00:00-05:00",
						"stops": 0,
						"segmentId": 6,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2029,
								"departureDateTime": "2022-02-26T18:40:00-05:00",
								"arrivalDateTime": "2022-02-26T20:00:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 20,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:55:00-05:00",
						"endDateTime": "2022-02-26T19:15:00-05:00",
						"stops": 0,
						"segmentId": 7,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2031,
								"departureDateTime": "2022-02-26T17:55:00-05:00",
								"arrivalDateTime": "2022-02-26T19:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 24,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:00:00-05:00",
						"endDateTime": "2022-02-26T09:20:00-05:00",
						"stops": 0,
						"segmentId": 8,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2009,
								"departureDateTime": "2022-02-26T08:00:00-05:00",
								"arrivalDateTime": "2022-02-26T09:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 27,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T04:30:00-05:00",
						"endDateTime": "2022-02-26T05:50:00-05:00",
						"stops": 0,
						"segmentId": 9,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2001,
								"departureDateTime": "2022-02-26T04:30:00-05:00",
								"arrivalDateTime": "2022-02-26T05:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 28,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T05:30:00-05:00",
						"endDateTime": "2022-02-26T06:50:00-05:00",
						"stops": 0,
						"segmentId": 10,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2003,
								"departureDateTime": "2022-02-26T05:30:00-05:00",
								"arrivalDateTime": "2022-02-26T06:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 30,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T06:30:00-05:00",
						"endDateTime": "2022-02-26T07:50:00-05:00",
						"stops": 0,
						"segmentId": 11,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2005,
								"departureDateTime": "2022-02-26T06:30:00-05:00",
								"arrivalDateTime": "2022-02-26T07:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 32,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T07:20:00-05:00",
						"endDateTime": "2022-02-26T08:40:00-05:00",
						"stops": 0,
						"segmentId": 12,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2007,
								"departureDateTime": "2022-02-26T07:20:00-05:00",
								"arrivalDateTime": "2022-02-26T08:40:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 35,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T11:00:00-05:00",
						"endDateTime": "2022-02-26T12:20:00-05:00",
						"stops": 0,
						"segmentId": 13,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2017,
								"departureDateTime": "2022-02-26T11:00:00-05:00",
								"arrivalDateTime": "2022-02-26T12:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 39,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:50:00-05:00",
						"endDateTime": "2022-02-26T10:10:00-05:00",
						"stops": 0,
						"segmentId": 14,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2011,
								"departureDateTime": "2022-02-26T08:50:00-05:00",
								"arrivalDateTime": "2022-02-26T10:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 40,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T09:50:00-05:00",
						"endDateTime": "2022-02-26T11:10:00-05:00",
						"stops": 0,
						"segmentId": 15,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2013,
								"departureDateTime": "2022-02-26T09:50:00-05:00",
								"arrivalDateTime": "2022-02-26T11:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 43,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T10:25:00-05:00",
						"endDateTime": "2022-02-26T11:45:00-05:00",
						"stops": 0,
						"segmentId": 16,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 3,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2015,
								"departureDateTime": "2022-02-26T10:25:00-05:00",
								"arrivalDateTime": "2022-02-26T11:45:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 46,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T13:45:00-05:00",
			"originCity": {
				"code": "CUZ",
				"name": "CUSCO",
				"airport": "Cusco",
				"country": "PE",
				"continent": "SA"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "LIMA",
				"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
				"country": "PE",
				"continent": "SA"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2012,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 4,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T19:10:00-05:00",
					"endDateTime": "2022-02-28T20:35:00-05:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2028,
							"departureDateTime": "2022-02-28T19:10:00-05:00",
							"arrivalDateTime": "2022-02-28T20:35:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 5,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 2,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2020,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 6,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:00:00-05:00",
					"endDateTime": "2022-02-28T16:25:00-05:00",
					"stops": 0,
					"segmentId": 3,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2036,
							"departureDateTime": "2022-02-28T15:00:00-05:00",
							"arrivalDateTime": "2022-02-28T16:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 7,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:05:00-05:00",
					"endDateTime": "2022-02-28T16:30:00-05:00",
					"stops": 0,
					"segmentId": 4,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2014,
							"departureDateTime": "2022-02-28T15:05:00-05:00",
							"arrivalDateTime": "2022-02-28T16:30:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 9,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:50:00-05:00",
					"endDateTime": "2022-02-28T17:15:00-05:00",
					"stops": 0,
					"segmentId": 5,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2022,
							"departureDateTime": "2022-02-28T15:50:00-05:00",
							"arrivalDateTime": "2022-02-28T17:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 12,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T16:45:00-05:00",
					"endDateTime": "2022-02-28T18:10:00-05:00",
					"stops": 0,
					"segmentId": 6,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2024,
							"departureDateTime": "2022-02-28T16:45:00-05:00",
							"arrivalDateTime": "2022-02-28T18:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 16,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T17:50:00-05:00",
					"endDateTime": "2022-02-28T19:15:00-05:00",
					"stops": 0,
					"segmentId": 7,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2026,
							"departureDateTime": "2022-02-28T17:50:00-05:00",
							"arrivalDateTime": "2022-02-28T19:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 19,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:35:00-05:00",
					"endDateTime": "2022-02-28T22:00:00-05:00",
					"stops": 0,
					"segmentId": 8,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2030,
							"departureDateTime": "2022-02-28T20:35:00-05:00",
							"arrivalDateTime": "2022-02-28T22:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 21,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:00:00-05:00",
					"endDateTime": "2022-02-28T21:25:00-05:00",
					"stops": 0,
					"segmentId": 9,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2032,
							"departureDateTime": "2022-02-28T20:00:00-05:00",
							"arrivalDateTime": "2022-02-28T21:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 22,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:55:00-05:00",
					"endDateTime": "2022-02-28T22:20:00-05:00",
					"stops": 0,
					"segmentId": 10,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2034,
							"departureDateTime": "2022-02-28T20:55:00-05:00",
							"arrivalDateTime": "2022-02-28T22:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 23,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:55:00-05:00",
					"endDateTime": "2022-02-28T11:20:00-05:00",
					"stops": 0,
					"segmentId": 11,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2010,
							"departureDateTime": "2022-02-28T09:55:00-05:00",
							"arrivalDateTime": "2022-02-28T11:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 27,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T06:40:00-05:00",
					"endDateTime": "2022-02-28T08:05:00-05:00",
					"stops": 0,
					"segmentId": 12,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2002,
							"departureDateTime": "2022-02-28T06:40:00-05:00",
							"arrivalDateTime": "2022-02-28T08:05:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 28,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T07:35:00-05:00",
					"endDateTime": "2022-02-28T09:00:00-05:00",
					"stops": 0,
					"segmentId": 13,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2004,
							"departureDateTime": "2022-02-28T07:35:00-05:00",
							"arrivalDateTime": "2022-02-28T09:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 29,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T08:50:00-05:00",
					"endDateTime": "2022-02-28T10:15:00-05:00",
					"stops": 0,
					"segmentId": 14,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2006,
							"departureDateTime": "2022-02-28T08:50:00-05:00",
							"arrivalDateTime": "2022-02-28T10:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 34,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:30:00-05:00",
					"endDateTime": "2022-02-28T10:55:00-05:00",
					"stops": 0,
					"segmentId": 15,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2008,
							"departureDateTime": "2022-02-28T09:30:00-05:00",
							"arrivalDateTime": "2022-02-28T10:55:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 36,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T12:25:00-05:00",
					"endDateTime": "2022-02-28T13:50:00-05:00",
					"stops": 0,
					"segmentId": 16,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2016,
							"departureDateTime": "2022-02-28T12:25:00-05:00",
							"arrivalDateTime": "2022-02-28T13:50:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 42,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:00:00-05:00",
					"endDateTime": "2022-02-28T14:25:00-05:00",
					"stops": 0,
					"segmentId": 17,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 3,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T13:00:00-05:00",
							"arrivalDateTime": "2022-02-28T14:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 45,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 110,
							"taxes": 35.58,
							"totalFare": 145.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 3,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 3,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								}
							]
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 110,
							"taxes": 35.58,
							"totalFare": 145.58,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 3,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 3,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								}
							]
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"origenSearch": "AllGds",
			"idGDS": "1",
			"idLogSearch": "T1RLAQIVoucn1rI/cNaqOgbQea48hr9xdxDM4HM9///+NLQy94ZSKKUEAADQKOgmbgcnpNhYG/ULf87UF2IiXIPpJ5lQcblCv7tfjI3rQzDWK9JpzUQ2kpk5vGnudk16oBJ4tXQbfj9cFiareVH+2ANQqeaWOCAnXukfGcfgPeU5gb6zQB9avKX/FuK61W//3cO1dwwZeyif5LJyJS7McuzVelFz+gopw/6xVTfyvdO4Y7hK93aWmO5+uBRrCYIWJu1iczEZ/8YtgVFu8SAPvLMxNSEpeuICu85mN8L4GDbOoGJr6XZFJl37MLuxEpKYrDXLl8mtTIo8Jwi3jw**",
			"webSessionID": "1",
			"pcc": "5KG5",
			"esFlyAndDrive": false,
			"searchDate": "2022-01-07T13:24:14"
		},
		"validate": {
			"tarifaTotalAdulto": "145.58",
			"tarifaNetaAdulto": "110",
			"listaClases": "A;A",
			"lineaAereaValidadora": "LA",
			"impuestos": "35.58"
		}
	},
	{
		"sequenceNumber": 4,
		"lowCost": false,
		"promoWeb": "",
		"esOnline": true,
		"id": "54ec7888-aeb6-47b1-a888-f3e714809096",
		"airline": {
			"code": "LA",
			"name": "LAN Airlines",
			"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
		},
		"departure": [
			{
				"departureDate": "2022-02-26T11:50:00-05:00",
				"originCity": {
					"code": "LIM",
					"name": "LIMA",
					"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
					"country": "PE",
					"continent": "SA"
				},
				"destinationCity": {
					"code": "LIM",
					"name": "CUSCO",
					"airport": "Cusco",
					"country": "PE",
					"continent": "SA"
				},
				"segments": [
					{
						"startDateTime": "2022-02-26T11:50:00-05:00",
						"endDateTime": "2022-02-26T13:10:00-05:00",
						"stops": 0,
						"segmentId": 0,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2019,
								"departureDateTime": "2022-02-26T11:50:00-05:00",
								"arrivalDateTime": "2022-02-26T13:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 4,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T19:00:00-05:00",
						"endDateTime": "2022-02-26T20:20:00-05:00",
						"stops": 0,
						"segmentId": 1,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2033,
								"departureDateTime": "2022-02-26T19:00:00-05:00",
								"arrivalDateTime": "2022-02-26T20:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 5,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:15:00-05:00",
						"endDateTime": "2022-02-26T15:35:00-05:00",
						"stops": 0,
						"segmentId": 2,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2021,
								"departureDateTime": "2022-02-26T14:15:00-05:00",
								"arrivalDateTime": "2022-02-26T15:35:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 8,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T14:30:00-05:00",
						"endDateTime": "2022-02-26T15:50:00-05:00",
						"stops": 0,
						"segmentId": 3,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2023,
								"departureDateTime": "2022-02-26T14:30:00-05:00",
								"arrivalDateTime": "2022-02-26T15:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 11,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T15:55:00-05:00",
						"endDateTime": "2022-02-26T17:15:00-05:00",
						"stops": 0,
						"segmentId": 4,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2025,
								"departureDateTime": "2022-02-26T15:55:00-05:00",
								"arrivalDateTime": "2022-02-26T17:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 14,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:10:00-05:00",
						"endDateTime": "2022-02-26T18:30:00-05:00",
						"stops": 0,
						"segmentId": 5,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2027,
								"departureDateTime": "2022-02-26T17:10:00-05:00",
								"arrivalDateTime": "2022-02-26T18:30:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 17,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T18:40:00-05:00",
						"endDateTime": "2022-02-26T20:00:00-05:00",
						"stops": 0,
						"segmentId": 6,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2029,
								"departureDateTime": "2022-02-26T18:40:00-05:00",
								"arrivalDateTime": "2022-02-26T20:00:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 20,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T17:55:00-05:00",
						"endDateTime": "2022-02-26T19:15:00-05:00",
						"stops": 0,
						"segmentId": 7,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2031,
								"departureDateTime": "2022-02-26T17:55:00-05:00",
								"arrivalDateTime": "2022-02-26T19:15:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 24,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:00:00-05:00",
						"endDateTime": "2022-02-26T09:20:00-05:00",
						"stops": 0,
						"segmentId": 8,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2009,
								"departureDateTime": "2022-02-26T08:00:00-05:00",
								"arrivalDateTime": "2022-02-26T09:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 27,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T04:30:00-05:00",
						"endDateTime": "2022-02-26T05:50:00-05:00",
						"stops": 0,
						"segmentId": 9,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2001,
								"departureDateTime": "2022-02-26T04:30:00-05:00",
								"arrivalDateTime": "2022-02-26T05:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 28,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T05:30:00-05:00",
						"endDateTime": "2022-02-26T06:50:00-05:00",
						"stops": 0,
						"segmentId": 10,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2003,
								"departureDateTime": "2022-02-26T05:30:00-05:00",
								"arrivalDateTime": "2022-02-26T06:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 30,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T06:30:00-05:00",
						"endDateTime": "2022-02-26T07:50:00-05:00",
						"stops": 0,
						"segmentId": 11,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2005,
								"departureDateTime": "2022-02-26T06:30:00-05:00",
								"arrivalDateTime": "2022-02-26T07:50:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 32,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T07:20:00-05:00",
						"endDateTime": "2022-02-26T08:40:00-05:00",
						"stops": 0,
						"segmentId": 12,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2007,
								"departureDateTime": "2022-02-26T07:20:00-05:00",
								"arrivalDateTime": "2022-02-26T08:40:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 35,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T11:00:00-05:00",
						"endDateTime": "2022-02-26T12:20:00-05:00",
						"stops": 0,
						"segmentId": 13,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2017,
								"departureDateTime": "2022-02-26T11:00:00-05:00",
								"arrivalDateTime": "2022-02-26T12:20:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 39,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T08:50:00-05:00",
						"endDateTime": "2022-02-26T10:10:00-05:00",
						"stops": 0,
						"segmentId": 14,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2011,
								"departureDateTime": "2022-02-26T08:50:00-05:00",
								"arrivalDateTime": "2022-02-26T10:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 40,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T09:50:00-05:00",
						"endDateTime": "2022-02-26T11:10:00-05:00",
						"stops": 0,
						"segmentId": 15,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2013,
								"departureDateTime": "2022-02-26T09:50:00-05:00",
								"arrivalDateTime": "2022-02-26T11:10:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 43,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					},
					{
						"startDateTime": "2022-02-26T10:25:00-05:00",
						"endDateTime": "2022-02-26T11:45:00-05:00",
						"stops": 0,
						"segmentId": 16,
						"flightDuration": "01.20",
						"equipaje": {
							"segmentos": [
								{
									"id": 0
								}
							],
							"piezas": 2,
							"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
							"cabina": {
								"piezas": 1,
								"peso": "",
								"descripcion1": "Artículo personal",
								"descripcion2": "(40cm*35cm*25cm)"
							}
						},
						"flightSegments": [
							{
								"guarantee": false,
								"flightNumber": 2015,
								"departureDateTime": "2022-02-26T10:25:00-05:00",
								"arrivalDateTime": "2022-02-26T11:45:00-05:00",
								"cabin": "A",
								"isReturn": false,
								"rph": 1,
								"idFlightSegment": 46,
								"elapsedTime": "01.20",
								"seatsRemaining": 7,
								"idRegla": 0,
								"departureAirport": {
									"code": "LIM",
									"name": "LIMA",
									"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
								},
								"arrivalAirport": {
									"code": "CUZ",
									"name": "CUSCO",
									"airport": "Cusco"
								},
								"airEquipType": "320",
								"operatingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								},
								"marketingAirline": {
									"code": "LA",
									"name": "LAN Airlines",
									"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
								}
							}
						]
					}
				]
			}
		],
		"returns": {
			"departureDate": "2022-02-28T13:45:00-05:00",
			"originCity": {
				"code": "CUZ",
				"name": "CUSCO",
				"airport": "Cusco",
				"country": "PE",
				"continent": "SA"
			},
			"destinationCity": {
				"code": "LIM",
				"name": "LIMA",
				"airport": "Lima [Aeropuerto Internacional Jorge Chavez]",
				"country": "PE",
				"continent": "SA"
			},
			"segments": [
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 0,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2012,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 4,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T19:10:00-05:00",
					"endDateTime": "2022-02-28T20:35:00-05:00",
					"stops": 0,
					"segmentId": 1,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2028,
							"departureDateTime": "2022-02-28T19:10:00-05:00",
							"arrivalDateTime": "2022-02-28T20:35:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 5,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:45:00-05:00",
					"endDateTime": "2022-02-28T15:10:00-05:00",
					"stops": 0,
					"segmentId": 2,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2020,
							"departureDateTime": "2022-02-28T13:45:00-05:00",
							"arrivalDateTime": "2022-02-28T15:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 6,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:00:00-05:00",
					"endDateTime": "2022-02-28T16:25:00-05:00",
					"stops": 0,
					"segmentId": 3,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2036,
							"departureDateTime": "2022-02-28T15:00:00-05:00",
							"arrivalDateTime": "2022-02-28T16:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 7,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:05:00-05:00",
					"endDateTime": "2022-02-28T16:30:00-05:00",
					"stops": 0,
					"segmentId": 4,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2014,
							"departureDateTime": "2022-02-28T15:05:00-05:00",
							"arrivalDateTime": "2022-02-28T16:30:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 9,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T15:50:00-05:00",
					"endDateTime": "2022-02-28T17:15:00-05:00",
					"stops": 0,
					"segmentId": 5,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2022,
							"departureDateTime": "2022-02-28T15:50:00-05:00",
							"arrivalDateTime": "2022-02-28T17:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 12,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T16:45:00-05:00",
					"endDateTime": "2022-02-28T18:10:00-05:00",
					"stops": 0,
					"segmentId": 6,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2024,
							"departureDateTime": "2022-02-28T16:45:00-05:00",
							"arrivalDateTime": "2022-02-28T18:10:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 16,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T17:50:00-05:00",
					"endDateTime": "2022-02-28T19:15:00-05:00",
					"stops": 0,
					"segmentId": 7,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2026,
							"departureDateTime": "2022-02-28T17:50:00-05:00",
							"arrivalDateTime": "2022-02-28T19:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 19,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:35:00-05:00",
					"endDateTime": "2022-02-28T22:00:00-05:00",
					"stops": 0,
					"segmentId": 8,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2030,
							"departureDateTime": "2022-02-28T20:35:00-05:00",
							"arrivalDateTime": "2022-02-28T22:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 21,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:00:00-05:00",
					"endDateTime": "2022-02-28T21:25:00-05:00",
					"stops": 0,
					"segmentId": 9,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2032,
							"departureDateTime": "2022-02-28T20:00:00-05:00",
							"arrivalDateTime": "2022-02-28T21:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 22,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "319",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T20:55:00-05:00",
					"endDateTime": "2022-02-28T22:20:00-05:00",
					"stops": 0,
					"segmentId": 10,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2034,
							"departureDateTime": "2022-02-28T20:55:00-05:00",
							"arrivalDateTime": "2022-02-28T22:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 23,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:55:00-05:00",
					"endDateTime": "2022-02-28T11:20:00-05:00",
					"stops": 0,
					"segmentId": 11,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2010,
							"departureDateTime": "2022-02-28T09:55:00-05:00",
							"arrivalDateTime": "2022-02-28T11:20:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 27,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T06:40:00-05:00",
					"endDateTime": "2022-02-28T08:05:00-05:00",
					"stops": 0,
					"segmentId": 12,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2002,
							"departureDateTime": "2022-02-28T06:40:00-05:00",
							"arrivalDateTime": "2022-02-28T08:05:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 28,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T07:35:00-05:00",
					"endDateTime": "2022-02-28T09:00:00-05:00",
					"stops": 0,
					"segmentId": 13,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2004,
							"departureDateTime": "2022-02-28T07:35:00-05:00",
							"arrivalDateTime": "2022-02-28T09:00:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 29,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T08:50:00-05:00",
					"endDateTime": "2022-02-28T10:15:00-05:00",
					"stops": 0,
					"segmentId": 14,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2006,
							"departureDateTime": "2022-02-28T08:50:00-05:00",
							"arrivalDateTime": "2022-02-28T10:15:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 34,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T09:30:00-05:00",
					"endDateTime": "2022-02-28T10:55:00-05:00",
					"stops": 0,
					"segmentId": 15,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2008,
							"departureDateTime": "2022-02-28T09:30:00-05:00",
							"arrivalDateTime": "2022-02-28T10:55:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 36,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T12:25:00-05:00",
					"endDateTime": "2022-02-28T13:50:00-05:00",
					"stops": 0,
					"segmentId": 16,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2016,
							"departureDateTime": "2022-02-28T12:25:00-05:00",
							"arrivalDateTime": "2022-02-28T13:50:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 42,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				},
				{
					"startDateTime": "2022-02-28T13:00:00-05:00",
					"endDateTime": "2022-02-28T14:25:00-05:00",
					"stops": 0,
					"segmentId": 17,
					"flightDuration": "01.25",
					"equipaje": {
						"segmentos": [
							{
								"id": 1
							}
						],
						"piezas": 2,
						"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
						"cabina": {
							"piezas": 1,
							"peso": "",
							"descripcion1": "Artículo personal",
							"descripcion2": "(40cm*35cm*25cm)"
						}
					},
					"flightSegments": [
						{
							"guarantee": false,
							"flightNumber": 2018,
							"departureDateTime": "2022-02-28T13:00:00-05:00",
							"arrivalDateTime": "2022-02-28T14:25:00-05:00",
							"cabin": "A",
							"isReturn": true,
							"rph": 2,
							"idFlightSegment": 45,
							"elapsedTime": "01.25",
							"seatsRemaining": 7,
							"idRegla": 0,
							"departureAirport": {
								"code": "CUZ",
								"name": "CUSCO",
								"airport": "Cusco"
							},
							"arrivalAirport": {
								"code": "LIM",
								"name": "LIMA",
								"airport": "Lima [Aeropuerto Internacional Jorge Chavez]"
							},
							"airEquipType": "320",
							"operatingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							},
							"marketingAirline": {
								"code": "LA",
								"name": "LAN Airlines",
								"imageUrl": "https://secure.nuevomundoviajes.pe/oferta-vuelosLA.gif"
							}
						}
					]
				}
			]
		},
		"pricingInfo": {
			"itinTotalFare": {
				"isPrivate": false,
				"validatingCarrier": "LA",
				"fareFamily": "",
				"fareBreakDowns": [
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 150,
							"taxes": 42.78,
							"totalFare": 192.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 2,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 2,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS",
									"cabina": {
										"piezas": 1,
										"peso": "",
										"descripcion1": "Artículo personal",
										"descripcion2": "(40cm*35cm*25cm)"
									}
								}
							]
						}
					},
					{
						"passengerType": {
							"code": "ADT",
							"quantity": 1,
							"equivalentCode": "ADT",
							"passengerTypeSearch": "ADT"
						},
						"fareBasisCodes": [],
						"passengerFare": {
							"baseFare": 150,
							"taxes": 42.78,
							"totalFare": 192.78,
							"feeNMV": 0,
							"feePTA": 0,
							"dsctoTaxes": 0,
							"baseFareOrderBy": 0
						},
						"equipaje": {
							"equipaje": [
								{
									"segmentos": [
										{
											"id": 0
										}
									],
									"piezas": 2,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								},
								{
									"segmentos": [
										{
											"id": 1
										}
									],
									"piezas": 2,
									"descripcion1": "UP TO 50 POUNDS/23 KILOGRAMS"
								}
							]
						}
					}
				]
			},
			"totalFare": 0
		},
		"gds": {
			"origenSearch": "AllGds",
			"idGDS": "1",
			"idLogSearch": "T1RLAQIVoucn1rI/cNaqOgbQea48hr9xdxDM4HM9///+NLQy94ZSKKUEAADQKOgmbgcnpNhYG/ULf87UF2IiXIPpJ5lQcblCv7tfjI3rQzDWK9JpzUQ2kpk5vGnudk16oBJ4tXQbfj9cFiareVH+2ANQqeaWOCAnXukfGcfgPeU5gb6zQB9avKX/FuK61W//3cO1dwwZeyif5LJyJS7McuzVelFz+gopw/6xVTfyvdO4Y7hK93aWmO5+uBRrCYIWJu1iczEZ/8YtgVFu8SAPvLMxNSEpeuICu85mN8L4GDbOoGJr6XZFJl37MLuxEpKYrDXLl8mtTIo8Jwi3jw**",
			"webSessionID": "1",
			"pcc": "5KG5",
			"esFlyAndDrive": false,
			"searchDate": "2022-01-07T13:24:14"
		},
		"validate": {
			"tarifaTotalAdulto": "192.78",
			"tarifaNetaAdulto": "150",
			"listaClases": "A;A",
			"lineaAereaValidadora": "LA",
			"impuestos": "42.78"
		}
	}
]