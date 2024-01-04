import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NmvModel } from '../shared/utils';
import { ResponseModelT } from '../shared/models';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FileService {
    constructor(private httpClient: HttpClient) { }

    uploadImg(formData:FormData){

        const url = environment.urlNmviajesAccount + '/v1/api/Profile/Avatar';

        return this.httpClient.put<ResponseModelT<any>>(url ,formData).pipe(map((resp) => resp.Result));

    }

    getImage(userId:number){
        const nmvModel = new NmvModel();

        const options = {
          params: nmvModel.params.set('Parameter.UserId', userId),
        };
    
        const url = environment.urlNmviajesAccount + '/v1/api/Profile/GetAvatar';
    
        return this.httpClient
          .get<ResponseModelT<any>>(url, options)
          .pipe(map((resp) => resp.Result));
    }
    
}