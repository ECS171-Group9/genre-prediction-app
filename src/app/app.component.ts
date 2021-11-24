import { Component, OnInit } from '@angular/core';
import { RestService } from "./rest.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'Book Genre Predictor';
    predicted = false;
    predictions: any;
    probabilities: any;
    threshold: any;

    constructor(private rs: RestService) { }

    ngOnInit() { }

    predictGenre(summary: string): void {

        console.log('Predicting Genre...');
        this.rs.getPrediction(summary).subscribe(response => {
            this.predictions =  response.prediction;
            this.probabilities = response.probabilities;
            this.threshold = response.threshold;
            this.predicted = true;
        },
        (error) => {
            console.log('Unable to retrieve data' + error);
        });
    }
}
