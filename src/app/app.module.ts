import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { RestService } from "./rest.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ChartsModule } from "ng2-charts";

@NgModule({
    declarations: [
        AppComponent,
        BarChartComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ChartsModule
    ],
    providers: [RestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
