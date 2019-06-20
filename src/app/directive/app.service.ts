import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { map, catchError } from "rxjs/operators";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/toPromise';
import { AppConstants } from './app.constants';

@Injectable()
export class AppService {
    url = AppConstants.API_URL;
    constructor(private http: Http) { }
    postMethod(action, requestJSON) {
        return this.http.post(this.url + action, requestJSON)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    getMethod(action) {
        return this.http.get(this.url + action)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    putMethod(action, id, requestJSON) {
        return this.http.put(this.url + action + id, requestJSON)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }
    deleteMethod(action, requestJSON) {
        return this.http.delete(this.url + action + requestJSON)
            .pipe(
                map(this.extractData),
                catchError(this.handleErrorObservable)
            );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
} 