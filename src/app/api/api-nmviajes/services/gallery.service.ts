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

import { RqGalleryGetByIdCeRequest1 } from '../models/rq-gallery-get-by-id-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class GalleryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiGalleryGet
   */
  static readonly V1ApiGalleryGetPath = '/Gallery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiGalleryGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiGalleryGet$Response(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GalleryService.V1ApiGalleryGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiGalleryGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiGalleryGet(params: {
    'Parameter.Status'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiGalleryGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiGalleryPut
   */
  static readonly V1ApiGalleryPutPath = '/Gallery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiGalleryPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiGalleryPut$Response(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Status'?: boolean;
      'Parameter.Images'?: Array<Blob>;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GalleryService.V1ApiGalleryPutPath, 'put');
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
   * To access the full response (for headers, for example), `v1ApiGalleryPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiGalleryPut(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Status'?: boolean;
      'Parameter.Images'?: Array<Blob>;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<void> {

    return this.v1ApiGalleryPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiGalleryPost
   */
  static readonly V1ApiGalleryPostPath = '/Gallery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiGalleryPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiGalleryPost$Response(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Images'?: Array<Blob>;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GalleryService.V1ApiGalleryPostPath, 'post');
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
   * To access the full response (for headers, for example), `v1ApiGalleryPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  v1ApiGalleryPost(params?: {
    body?: {
      'Parameter.Code'?: string;
      'Parameter.Name'?: string;
      'Parameter.Images'?: Array<Blob>;
      'TrackingCode': string;
      'MuteExceptions': boolean;
      'Caller.Company': string;
      'Caller.Application': string;
    }
  }): Observable<void> {

    return this.v1ApiGalleryPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiGalleryDelete
   */
  static readonly V1ApiGalleryDeletePath = '/Gallery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiGalleryDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiGalleryDelete$Response(params?: {
    body?: RqGalleryGetByIdCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GalleryService.V1ApiGalleryDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `v1ApiGalleryDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiGalleryDelete(params?: {
    body?: RqGalleryGetByIdCeRequest1
  }): Observable<void> {

    return this.v1ApiGalleryDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiGalleryCodeGet
   */
  static readonly V1ApiGalleryCodeGetPath = '/Gallery/Code';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiGalleryCodeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiGalleryCodeGet$Response(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GalleryService.V1ApiGalleryCodeGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiGalleryCodeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiGalleryCodeGet(params: {
    'Parameter.Code'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiGalleryCodeGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
