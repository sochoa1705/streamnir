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

import { RqAirlineDeleteCeRequest1 } from '../models/rq-airline-delete-ce-request-1';
import { RqAirlineFullGetCeRequest1 } from '../models/rq-airline-full-get-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class AirlineService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiAirlineGet
   */
  static readonly V1ApiAirlineGetPath = '/v1/api/Airline';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiAirlineGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiAirlineGet$Response(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AirlineService.V1ApiAirlineGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiAirlineGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiAirlineGet(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiAirlineGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiAirlinePut
   */
  static readonly V1ApiAirlinePutPath = '/v1/api/Airline';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiAirlinePut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlinePut$Response(params?: {
    body?: RqAirlineFullGetCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AirlineService.V1ApiAirlinePutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
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
   * To access the full response (for headers, for example), `v1ApiAirlinePut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlinePut(params?: {
    body?: RqAirlineFullGetCeRequest1
  }): Observable<void> {

    return this.v1ApiAirlinePut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiAirlinePost
   */
  static readonly V1ApiAirlinePostPath = '/v1/api/Airline';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiAirlinePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlinePost$Response(params?: {
    body?: RqAirlineFullGetCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AirlineService.V1ApiAirlinePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
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
   * To access the full response (for headers, for example), `v1ApiAirlinePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlinePost(params?: {
    body?: RqAirlineFullGetCeRequest1
  }): Observable<void> {

    return this.v1ApiAirlinePost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiAirlineDelete
   */
  static readonly V1ApiAirlineDeletePath = '/v1/api/Airline';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiAirlineDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlineDelete$Response(params?: {
    body?: RqAirlineDeleteCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AirlineService.V1ApiAirlineDeletePath, 'delete');
    if (params) {
      rb.body(params.body, 'application/*+json');
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
   * To access the full response (for headers, for example), `v1ApiAirlineDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiAirlineDelete(params?: {
    body?: RqAirlineDeleteCeRequest1
  }): Observable<void> {

    return this.v1ApiAirlineDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiAirlineIataCodeGet
   */
  static readonly V1ApiAirlineIataCodeGetPath = '/v1/api/Airline/IataCode';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiAirlineIataCodeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiAirlineIataCodeGet$Response(params: {
    'Parameter.IataCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AirlineService.V1ApiAirlineIataCodeGetPath, 'get');
    if (params) {
      rb.query('Parameter.IataCode', params['Parameter.IataCode'], {});
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
   * To access the full response (for headers, for example), `v1ApiAirlineIataCodeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiAirlineIataCodeGet(params: {
    'Parameter.IataCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiAirlineIataCodeGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
