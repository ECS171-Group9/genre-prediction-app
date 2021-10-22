import { Component, OnInit } from '@angular/core';
import { RestService} from "./rest.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'Book Genre Prediction';
    prediction: any;

    constructor(private rs: RestService) { }

    ngOnInit() {
        this.rs.getPrediction().subscribe((response) => {
            this.prediction =  response;
        },
        (error) => {
            console.log('Unable to retrieve data' + error);
        });
    }
}
