/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService extends BaseService {
	constructor(config: ApiConfiguration, http: HttpClient) {
		super(config, http);
	}

  /**
   * Path part for operation v1ApiFlightGetMostWantedGet
   */
  static readonly V1ApiFlightGetMostWantedGetPath = '/Flight/GetMostWanted';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetMostWantedGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetMostWantedGet$Response(params: {
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<void>> {
	  const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetMostWantedGetPath, 'get');
	  if (params) {
		  rb.query('Parameter.Type', params['Parameter.Type'], {});
		  this.setRequest(rb, params);
	  }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

	/**
	 * This method provides access to only the response body.
	 * To access the full response (for headers, for example), `v1ApiFlightGetMostWantedGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	v1ApiFlightGetMostWantedGet(params: {
		'Parameter.Type'?: string;
		TrackingCode: string;
		MuteExceptions: boolean;
		'Caller.Company': string;
		'Caller.Application': string;
		context?: HttpContext
	}): Observable<void> {
		return this.v1ApiFlightGetMostWantedGet$Response(params)
				.pipe(map((r: StrictHttpResponse<void>) => r.body as void));
	}

  /**
   * Path part for operation v1ApiFlightGetContinentsGet
   */
  static readonly V1ApiFlightGetContinentsGetPath = '/Flight/GetContinents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetContinentsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetContinentsGet$Response(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<void>> {
	  const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetContinentsGetPath, 'get');
	  if (params) {
		  rb.query('Parameter.Status', params['Parameter.Status'], {});
		  this.setRequest(rb, params);
	  }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

	/**
	 * This method provides access to only the response body.
	 * To access the full response (for headers, for example), `v1ApiFlightGetContinentsGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
  v1ApiFlightGetContinentsGet(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<void> {

    return this.v1ApiFlightGetContinentsGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetLastSearchesByContinentGet
   */
  static readonly V1ApiFlightGetLastSearchesByContinentGetPath = '/Flight/GetLastSearchesByContinent';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetLastSearchesByContinentGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetLastSearchesByContinentGet$Response(params: {
    'Parameter.ContinentCode'?: string;
    'Parameter.DestinationCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<void>> {
	  const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetLastSearchesByContinentGetPath, 'get');
	  if (params) {
		  rb.query('Parameter.ContinentCode', params['Parameter.ContinentCode'], {});
		  rb.query('Parameter.DestinationCode', params['Parameter.DestinationCode'], {});
		  this.setRequest(rb, params);
	  }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

	/**
	 * This method provides access to only the response body.
	 * To access the full response (for headers, for example), `v1ApiFlightGetLastSearchesByContinentGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
  v1ApiFlightGetLastSearchesByContinentGet(params: {
    'Parameter.ContinentCode'?: string;
    'Parameter.DestinationCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<void> {

    return this.v1ApiFlightGetLastSearchesByContinentGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetLastSearchesByAirlineGet
   */
  static readonly V1ApiFlightGetLastSearchesByAirlineGetPath = '/Flight/GetLastSearchesByAirline';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetLastSearchesByAirlineGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetLastSearchesByAirlineGet$Response(params: {
    'Parameter.IataCode'?: string;
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<void>> {
	  const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetLastSearchesByAirlineGetPath, 'get');
	  if (params) {
		  rb.query('Parameter.IataCode', params['Parameter.IataCode'], {});
		  rb.query('Parameter.Type', params['Parameter.Type'], {});
		  this.setRequest(rb, params);
	  }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

	/**
	 * This method provides access to only the response body.
	 * To access the full response (for headers, for example), `v1ApiFlightGetLastSearchesByAirlineGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
  v1ApiFlightGetLastSearchesByAirlineGet(params: {
    'Parameter.IataCode'?: string;
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    context?: HttpContext
  }
  ): Observable<void> {

    return this.v1ApiFlightGetLastSearchesByAirlineGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

	private setRequest(requestBuilder: RequestBuilder, params: any): RequestBuilder {
		requestBuilder.query('TrackingCode', params.TrackingCode, {});
		requestBuilder.query('MuteExceptions', params.MuteExceptions, {});
		requestBuilder.query('Caller.Company', params['Caller.Company'], {});
		requestBuilder.query('Caller.Application', params['Caller.Application'], {});
		return requestBuilder;
	}
}
