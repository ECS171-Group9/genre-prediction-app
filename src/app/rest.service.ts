import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(
        private http : HttpClient,
        private router: Router
    ) { }

    ngOnInit() { }

    predictionUrl : string = this.router.url + '/prediction/';

    getPrediction() {
        return this.http.get(this.predictionUrl);
    }
}
