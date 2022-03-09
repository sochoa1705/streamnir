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

import { RqPropertyDeleteCeRequest1 } from '../models/rq-property-delete-ce-request-1';
import { RqPropertyPostCeRequest1 } from '../models/rq-property-post-ce-request-1';
import { RqPropertyPutCeRequest1 } from '../models/rq-property-put-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class PropertyService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiPropertyGet
   */
  static readonly V1ApiPropertyGetPath = '/v1/api/Property';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPropertyGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPropertyGet$Response(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PropertyService.V1ApiPropertyGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiPropertyGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPropertyGet(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiPropertyGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiPropertyPut
   */
  static readonly V1ApiPropertyPutPath = '/v1/api/Property';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPropertyPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyPut$Response(params?: {
    body?: RqPropertyPutCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PropertyService.V1ApiPropertyPutPath, 'put');
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
   * To access the full response (for headers, for example), `v1ApiPropertyPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyPut(params?: {
    body?: RqPropertyPutCeRequest1
  }): Observable<void> {

    return this.v1ApiPropertyPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiPropertyPost
   */
  static readonly V1ApiPropertyPostPath = '/v1/api/Property';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPropertyPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyPost$Response(params?: {
    body?: RqPropertyPostCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PropertyService.V1ApiPropertyPostPath, 'post');
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
   * To access the full response (for headers, for example), `v1ApiPropertyPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyPost(params?: {
    body?: RqPropertyPostCeRequest1
  }): Observable<void> {

    return this.v1ApiPropertyPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiPropertyDelete
   */
  static readonly V1ApiPropertyDeletePath = '/v1/api/Property';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPropertyDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyDelete$Response(params?: {
    body?: RqPropertyDeleteCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PropertyService.V1ApiPropertyDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `v1ApiPropertyDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPropertyDelete(params?: {
    body?: RqPropertyDeleteCeRequest1
  }): Observable<void> {

    return this.v1ApiPropertyDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiPropertyIdGet
   */
  static readonly V1ApiPropertyIdGetPath = '/v1/api/Property/Id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPropertyIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPropertyIdGet$Response(params: {
    'Parameter.Id'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PropertyService.V1ApiPropertyIdGetPath, 'get');
    if (params) {
      rb.query('Parameter.Id', params['Parameter.Id'], {});
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
   * To access the full response (for headers, for example), `v1ApiPropertyIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPropertyIdGet(params: {
    'Parameter.Id'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiPropertyIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
