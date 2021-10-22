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

    getPrediction() {
        const predictionUrl = '/prediction/';
        return this.http.get(predictionUrl);
    }
}
