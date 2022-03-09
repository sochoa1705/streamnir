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

import { RqTicketDeleteCeRequest1 } from '../models/rq-ticket-delete-ce-request-1';
import { RqTicketFullGetCeRequest1 } from '../models/rq-ticket-full-get-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class TicketsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiTicketsGet
   */
  static readonly V1ApiTicketsGetPath = '/v1/api/Tickets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTicketsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTicketsGet$Response(params: {
    'Parameter.Country'?: string;
    'Parameter.City'?: string;
    'Parameter.Site'?: string;
    'Parameter.IsFlight'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TicketsService.V1ApiTicketsGetPath, 'get');
    if (params) {
      rb.query('Parameter.Country', params['Parameter.Country'], {});
      rb.query('Parameter.City', params['Parameter.City'], {});
      rb.query('Parameter.Site', params['Parameter.Site'], {});
      rb.query('Parameter.IsFlight', params['Parameter.IsFlight'], {});
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
   * To access the full response (for headers, for example), `v1ApiTicketsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTicketsGet(params: {
    'Parameter.Country'?: string;
    'Parameter.City'?: string;
    'Parameter.Site'?: string;
    'Parameter.IsFlight'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiTicketsGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiTicketsPost
   */
  static readonly V1ApiTicketsPostPath = '/v1/api/Tickets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTicketsPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsPost$Response(params?: {
    body?: RqTicketFullGetCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TicketsService.V1ApiTicketsPostPath, 'post');
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
   * To access the full response (for headers, for example), `v1ApiTicketsPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsPost(params?: {
    body?: RqTicketFullGetCeRequest1
  }): Observable<void> {

    return this.v1ApiTicketsPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiTicketsIdGet
   */
  static readonly V1ApiTicketsIdGetPath = '/v1/api/Tickets/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTicketsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTicketsIdGet$Response(params: {
    'Parameter.id'?: number;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TicketsService.V1ApiTicketsIdGetPath, 'get');
    if (params) {
      rb.query('Parameter.id', params['Parameter.id'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `v1ApiTicketsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTicketsIdGet(params: {
    'Parameter.id'?: number;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    id: string;
  }): Observable<void> {

    return this.v1ApiTicketsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiTicketsIdPut
   */
  static readonly V1ApiTicketsIdPutPath = '/v1/api/Tickets/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTicketsIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsIdPut$Response(params: {
    id: string;
    body?: RqTicketFullGetCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TicketsService.V1ApiTicketsIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `v1ApiTicketsIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsIdPut(params: {
    id: string;
    body?: RqTicketFullGetCeRequest1
  }): Observable<void> {

    return this.v1ApiTicketsIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiTicketsIdDelete
   */
  static readonly V1ApiTicketsIdDeletePath = '/v1/api/Tickets/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTicketsIdDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsIdDelete$Response(params: {
    id: string;
    body?: RqTicketDeleteCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TicketsService.V1ApiTicketsIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `v1ApiTicketsIdDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTicketsIdDelete(params: {
    id: string;
    body?: RqTicketDeleteCeRequest1
  }): Observable<void> {

    return this.v1ApiTicketsIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
