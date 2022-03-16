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

import { RqDestinationGetByIdCeRequest1 } from '../models/rq-destination-get-by-id-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class DestinationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiDestinationGet
   */
  static readonly V1ApiDestinationGetPath = '/v1/api/Destination';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiDestinationGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiDestinationGet$Response(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DestinationService.V1ApiDestinationGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiDestinationGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiDestinationGet(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiDestinationGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiDestinationPut
   */
  static readonly V1ApiDestinationPutPath = '/v1/api/Destination';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiDestinationPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiDestinationPut$Response(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Status'?: boolean;
      'Parameter.Galleries'?: Array<Blob>;
      'Parameter.History'?: string;
      'Parameter.Description'?: string;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DestinationService.V1ApiDestinationPutPath, 'put');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * To access the full response (for headers, for example), `v1ApiDestinationPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiDestinationPut(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Status'?: boolean;
      'Parameter.Galleries'?: Array<Blob>;
      'Parameter.History'?: string;
      'Parameter.Description'?: string;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<void> {

    return this.v1ApiDestinationPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiDestinationPost
   */
  static readonly V1ApiDestinationPostPath = '/v1/api/Destination';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiDestinationPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiDestinationPost$Response(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Galleries'?: Array<Blob>;
      'Parameter.History'?: string;
      'Parameter.Description'?: string;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DestinationService.V1ApiDestinationPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * To access the full response (for headers, for example), `v1ApiDestinationPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiDestinationPost(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Galleries'?: Array<Blob>;
      'Parameter.History'?: string;
      'Parameter.Description'?: string;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<void> {

    return this.v1ApiDestinationPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiDestinationDelete
   */
  static readonly V1ApiDestinationDeletePath = '/v1/api/Destination';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiDestinationDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiDestinationDelete$Response(params?: {
    body?: RqDestinationGetByIdCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DestinationService.V1ApiDestinationDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `v1ApiDestinationDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiDestinationDelete(params?: {
    body?: RqDestinationGetByIdCeRequest1
  }): Observable<void> {

    return this.v1ApiDestinationDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiDestinationCodeGet
   */
  static readonly V1ApiDestinationCodeGetPath = '/Destination/Code';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiDestinationCodeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiDestinationCodeGet$Response(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DestinationService.V1ApiDestinationCodeGetPath, 'get');
    if (params) {
      rb.query('Parameter.Code', params['Parameter.Code'], {});
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
   * To access the full response (for headers, for example), `v1ApiDestinationCodeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiDestinationCodeGet(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiDestinationCodeGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
