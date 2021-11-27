import { Component, OnInit } from '@angular/core';
import { RestService } from "./rest.service";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'Book Genre Predictor';
    formattedPredictions = <any>[];
    predicted = false;
    predictions = [];
    probabilities = [];
    threshold = 0;
    graphLabels: Label[] = [];
    graphData: ChartDataSets[] = [];

    constructor(private rs: RestService) { }

    ngOnInit() { }

    predictGenre(summary: string): void {

        console.log('Predicting Genre...');
        this.rs.getPrediction(summary).subscribe(response => {
            // Clear any existing graph info to avoid multiple prediction displays
            this.graphLabels = [];
            this.graphData = [];
            // get response data
            this.predictions =  response.prediction;
            this.probabilities = response.probabilities;
            this.threshold = response.threshold;
            // Adjust predictions into a percent
            for (let i = 0; i < this.predictions.length; i++) {
                this.formattedPredictions[i] = [this.predictions[i][0],
                    (this.predictions[i][1] * 100).toFixed(2)];
            }
            // Set Graph Data and Labels
            let probData: number[] = [];
            this.probabilities.forEach((probabilitySet) => {
                this.graphLabels.push(probabilitySet[0]);
                probData.push(probabilitySet[1]);
            });
            // CharDataSets element in the form:
            // { data: [2500, 5900, 6000, 8100, 8600, 8050, 1200], label: 'Company A' }
            const dataSet = {
                data: probData,
                label: 'Probability'
            };
            this.graphData.push(dataSet);

            this.predicted = true;
        },
        (error) => {
            console.log('Unable to retrieve data' + error);
        });
    }
}
