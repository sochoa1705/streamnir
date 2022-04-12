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
export class CardService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiCardGet
   */
  static readonly V1ApiCardGetPath = '/v1/api/Card';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiCardGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiCardGet$Response(params: {
    'Parameter.Bin'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    'Caller.FromIP'?: string;
    'Caller.FromBrowser'?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CardService.V1ApiCardGetPath, 'get');
    if (params) {
      rb.query('Parameter.Bin', params['Parameter.Bin'], {});
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
   * To access the full response (for headers, for example), `v1ApiCardGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiCardGet(params: {
    'Parameter.Bin'?: string;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
    'Caller.FromIP'?: string;
    'Caller.FromBrowser'?: string;
  }): Observable<void> {

    return this.v1ApiCardGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
