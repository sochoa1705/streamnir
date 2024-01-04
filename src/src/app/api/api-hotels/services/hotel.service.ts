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
export class HotelService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v1ApiHotelGet
   */
  static readonly V1ApiHotelGetPath = '/v1/api/Hotel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ApiHotelGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiHotelGet$Response(params: {
    'Parameter.Country'?: string;
    'Parameter.City'?: string;
    'Parameter.Site'?: string;
    'Parameter.IsFlight'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HotelService.V1ApiHotelGetPath, 'get');
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
   * To access the full response (for headers, for example), `v1ApiHotelGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ApiHotelGet(params: {
    'Parameter.Country'?: string;
    'Parameter.City'?: string;
    'Parameter.Site'?: string;
    'Parameter.IsFlight'?: boolean;
    TrackingCode: string;
    MuteExceptions: boolean;
    'Caller.Company': string;
    'Caller.Application': string;
  }): Observable<void> {

    return this.v1ApiHotelGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
