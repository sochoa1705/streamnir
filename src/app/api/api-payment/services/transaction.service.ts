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

import { RqPostTransactionCeRequest1 } from '../models/rq-post-transaction-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiTransactionGet
   */
  static readonly V1ApiTransactionGetPath = '/v1/api/Transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTransactionGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTransactionGet$Response(params: {
    'Parameter.TransactionCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    'Caller.FromIP'?: string;
    'Caller.FromBrowser'?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.V1ApiTransactionGetPath, 'get');
    if (params) {
      rb.query('Parameter.TransactionCode', params['Parameter.TransactionCode'], {});
      rb.query('TrackingCode', params.TrackingCode, {});
      rb.query('MuteExceptions', params.MuteExceptions, {});
      rb.query('Caller.Company', params['Caller.Company'], {});
      rb.query('Caller.Application', params['Caller.Application'], {});
      rb.query('Caller.FromIP', params['Caller.FromIP'], {});
      rb.query('Caller.FromBrowser', params['Caller.FromBrowser'], {});
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
   * To access the full response (for headers, for example), `v1ApiTransactionGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiTransactionGet(params: {
    'Parameter.TransactionCode'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    'Caller.FromIP'?: string;
    'Caller.FromBrowser'?: string;
  }): Observable<void> {

    return this.v1ApiTransactionGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiTransactionPost
   */
  static readonly V1ApiTransactionPostPath = '/v1/api/Transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiTransactionPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTransactionPost$Response(params?: {
    body?: RqPostTransactionCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionService.V1ApiTransactionPostPath, 'post');
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
   * To access the full response (for headers, for example), `v1ApiTransactionPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiTransactionPost(params?: {
    body?: RqPostTransactionCeRequest1
  }): Observable<void> {

    return this.v1ApiTransactionPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
