import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http : HttpClient) { }

    ngOnInit() { }

    predictionUrl : string = 'http://localhost:5000/prediction/';

    getPrediction() {
        return this.http.get(this.predictionUrl);
    }
}
