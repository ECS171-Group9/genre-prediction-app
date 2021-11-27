import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
    @Input() barChartLabels: Label[] = [];
    @Input() barChartData: ChartDataSets[] = [];

    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];

    barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
                ticks: {
                    min: 0,
                    max: 1.0,
                    stepSize: 0.2
                }
            }]
        },
    };

}
