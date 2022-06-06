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

import { CeEmailParameterSimpleCeRequest1 } from '../models/ce-email-parameter-simple-ce-request-1';
import { CeReservaCeEmailParameterCustomCeRequest1 } from '../models/ce-reserva-ce-email-parameter-custom-ce-request-1';
import { CeResponse } from '../models/ce-response';
import { CeSeguroCeEmailParameterCustomCeRequest1 } from '../models/ce-seguro-ce-email-parameter-custom-ce-request-1';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiMessageSendSimplePost
   */
  static readonly V1ApiMessageSendSimplePostPath = '/v1/api/Message/SendSimple';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiMessageSendSimplePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendSimplePost$Response(params?: {
    body?: CeEmailParameterSimpleCeRequest1
  }): Observable<StrictHttpResponse<CeResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.V1ApiMessageSendSimplePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CeResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1ApiMessageSendSimplePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendSimplePost(params?: {
    body?: CeEmailParameterSimpleCeRequest1
  }): Observable<CeResponse> {

    return this.v1ApiMessageSendSimplePost$Response(params).pipe(
      map((r: StrictHttpResponse<CeResponse>) => r.body as CeResponse)
    );
  }

  /**
   * Path part for operation v1ApiMessageSendComprobanteReservaPost
   */
  static readonly V1ApiMessageSendComprobanteReservaPostPath = '/v1/api/Message/SendComprobanteReserva';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiMessageSendComprobanteReservaPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendComprobanteReservaPost$Response(params?: {
    body?: CeReservaCeEmailParameterCustomCeRequest1
  }): Observable<StrictHttpResponse<CeResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.V1ApiMessageSendComprobanteReservaPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CeResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1ApiMessageSendComprobanteReservaPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendComprobanteReservaPost(params?: {
    body?: CeReservaCeEmailParameterCustomCeRequest1
  }): Observable<CeResponse> {

    return this.v1ApiMessageSendComprobanteReservaPost$Response(params).pipe(
      map((r: StrictHttpResponse<CeResponse>) => r.body as CeResponse)
    );
  }

  /**
   * Path part for operation v1ApiMessageSendConfirmacionSeguroPost
   */
  static readonly V1ApiMessageSendConfirmacionSeguroPostPath = '/v1/api/Message/SendConfirmacionSeguro';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiMessageSendConfirmacionSeguroPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendConfirmacionSeguroPost$Response(params?: {
    body?: CeSeguroCeEmailParameterCustomCeRequest1
  }): Observable<StrictHttpResponse<CeResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MessageService.V1ApiMessageSendConfirmacionSeguroPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CeResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1ApiMessageSendConfirmacionSeguroPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1ApiMessageSendConfirmacionSeguroPost(params?: {
    body?: CeSeguroCeEmailParameterCustomCeRequest1
  }): Observable<CeResponse> {

    return this.v1ApiMessageSendConfirmacionSeguroPost$Response(params).pipe(
      map((r: StrictHttpResponse<CeResponse>) => r.body as CeResponse)
    );
  }

}
