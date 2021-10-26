import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(
        private http : HttpClient
    ) { }

    ngOnInit() { }

    getPrediction(summary: string) {
        const payload = {
            data: summary
        }
        const predictionUrl = '/prediction' ;
        return this.http.post(predictionUrl, payload);
    }
}
