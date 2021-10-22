import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Location } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(
        private http : HttpClient,
        private location: Location
    ) { }

    ngOnInit() { }
    apiUrl = 'https://book-genre-prediction.herokuapp.com:5000';


    getPrediction() {
        console.log('JIM: ' + this.location.path());
        const predictionUrl = this.apiUrl + '/prediction/';
        return this.http.get(predictionUrl);
    }
}
