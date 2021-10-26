import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(
        private http : HttpClient
    ) { }

    ngOnInit() { }

    getPrediction(summary: string): Observable<any> {
        const payload = {
            data: summary
        }
        const predictionUrl = '/prediction' ;
        return this.http.post(predictionUrl, payload);
    }
}
