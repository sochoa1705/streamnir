/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FlightService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiFlightGetRatesGet
   */
  static readonly V1ApiFlightGetRatesGetPath = '/v1/api/Flight/GetRates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetRatesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetRatesGet$Response(params: {
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetRatesGetPath, 'get');
    if (params) {
      rb.query('Parameter.Type', params['Parameter.Type'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1ApiFlightGetRatesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetRatesGet(params: {
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiFlightGetRatesGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetMostWantedGet
   */
  static readonly V1ApiFlightGetMostWantedGetPath = '/v1/api/Flight/GetMostWanted';

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetMostWantedGetPath, 'get');
    if (params) {
      rb.query('Parameter.Type', params['Parameter.Type'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
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
  }): Observable<void> {

    return this.v1ApiFlightGetMostWantedGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetLastSearchesByCityGet
   */
  static readonly V1ApiFlightGetLastSearchesByCityGetPath = '/v1/api/Flight/GetLastSearchesByCity';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiFlightGetLastSearchesByCityGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetLastSearchesByCityGet$Response(params: {
    'Parameter.CodeOrigin'?: string;
    'Parameter.CodeDestination'?: string;
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetLastSearchesByCityGetPath, 'get');
    if (params) {
      rb.query('Parameter.CodeOrigin', params['Parameter.CodeOrigin'], {});
      rb.query('Parameter.CodeDestination', params['Parameter.CodeDestination'], {});
      rb.query('Parameter.Type', params['Parameter.Type'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1ApiFlightGetLastSearchesByCityGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiFlightGetLastSearchesByCityGet(params: {
    'Parameter.CodeOrigin'?: string;
    'Parameter.CodeDestination'?: string;
    'Parameter.Type'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiFlightGetLastSearchesByCityGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetContinentsGet
   */
  static readonly V1ApiFlightGetContinentsGetPath = '/v1/api/Flight/GetContinents';

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetContinentsGetPath, 'get');
    if (params) {
      rb.query('Parameter.Status', params['Parameter.Status'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
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
  }): Observable<void> {

    return this.v1ApiFlightGetContinentsGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetLastSearchesByContinentGet
   */
  static readonly V1ApiFlightGetLastSearchesByContinentGetPath = '/v1/api/Flight/GetLastSearchesByContinent';

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetLastSearchesByContinentGetPath, 'get');
    if (params) {
      rb.query('Parameter.ContinentCode', params['Parameter.ContinentCode'], {});
      rb.query('Parameter.DestinationCode', params['Parameter.DestinationCode'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
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
  }): Observable<void> {

    return this.v1ApiFlightGetLastSearchesByContinentGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiFlightGetLastSearchesByAirlineGet
   */
  static readonly V1ApiFlightGetLastSearchesByAirlineGetPath = '/v1/api/Flight/GetLastSearchesByAirline';

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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FlightService.V1ApiFlightGetLastSearchesByAirlineGetPath, 'get');
    if (params) {
      rb.query('Parameter.IataCode', params['Parameter.IataCode'], {});
      rb.query('Parameter.Type', params['Parameter.Type'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
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
  }): Observable<void> {

    return this.v1ApiFlightGetLastSearchesByAirlineGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
