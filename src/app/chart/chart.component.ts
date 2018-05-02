import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NameSeries } from './name-series';
import { DateValue } from './date-value';

@Component({
  selector: 'app-chart',
  template: `
    <ngx-charts-line-chart [results]="chartData" [scheme]="scheme" [autoScale]="true"
                           [showXAxisLabel]="true" [xAxisLabel]="xAxisLabel"
                           [showYAxisLabel]="!!yAxisLabel" [yAxisLabel]="yAxisLabel"
                           [xAxis]="true" [yAxis]="true">
    </ngx-charts-line-chart>
  `,
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() series: DateValue<number>[];
  @Input() name: string;
  @Input() scheme: string[];
  @Input() yAxisLabel: string;
  xAxisLabel: string;
  chartDimensions: Array<number>;
  chartData: NameSeries<number>[];

  constructor() {
  }

  ngOnInit() {
    this.chartDimensions = [300, 448];
    this.xAxisLabel = 'Date';
    this.chartData = [
      {
        name: this.name,
        series: this.series
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.series) {
      this.chartData = [
        {
          name: this.name,
          series: changes.series.currentValue
        }
      ];
    }
  }
}
