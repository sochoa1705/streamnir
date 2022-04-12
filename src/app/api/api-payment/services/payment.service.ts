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

import { RqPaymentCeRequest1 } from '../models/rq-payment-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiPaymentGet
   */
  static readonly V1ApiPaymentGetPath = '/v1/api/Payment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPaymentGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPaymentGet$Response(params?: {
    trackingCode?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.V1ApiPaymentGetPath, 'get');
    if (params) {
      rb.query('trackingCode', params.trackingCode, {});
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
   * To access the full response (for headers, for example), `v1ApiPaymentGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiPaymentGet(params?: {
    trackingCode?: string;
  }): Observable<void> {

    return this.v1ApiPaymentGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v1ApiPaymentPost
   */
  static readonly V1ApiPaymentPostPath = '/v1/api/Payment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiPaymentPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPaymentPost$Response(params?: {
    body?: RqPaymentCeRequest1
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.V1ApiPaymentPostPath, 'post');
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
   * To access the full response (for headers, for example), `v1ApiPaymentPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  v1ApiPaymentPost(params?: {
    body?: RqPaymentCeRequest1
  }): Observable<void> {

    return this.v1ApiPaymentPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
