import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChildService, Weight, WeightSystem } from '../child.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DateValue } from '../chart/date-value';

@Component({
  selector: 'app-weight',
  template: `
    <mat-card>
      <mat-card-title>Weight Tracker</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" fxLayout="column">
          <div class="poundsContainer" fxLayout="row" *ngIf="unitsControl.value === 'lbs'">
            <mat-form-field class="poundsInput">
              <input matInput type="number" [formControl]="poundsControl" min="0"
                     placeholder="Pounds">
            </mat-form-field>
            <mat-form-field>
              <input matInput type="number" [formControl]="ouncesControl" min="0"
                     placeholder="Ounces">
            </mat-form-field>
          </div>
          <mat-form-field *ngIf="unitsControl.value === 'kg'">
            <input matInput type="number" [formControl]="kilogramsControl" min="0"
                   placeholder="Kilograms">
          </mat-form-field>
          <mat-form-field>
            <mat-select [formControl]="unitsControl" placeholder="Units">
              <mat-option value="lbs">Standard</mat-option>
              <mat-option value="kg">Metric</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <input matInput [matDatepicker]="picker" placeholder="Date of Measurement"
                   [formControl]="dateControl">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-button (click)="onAddWeightEntry()" color="primary"
                  [disabled]="form.pristine || form.invalid">
            Save
          </button>
        </form>
        <div class="tableContainer" *ngIf="childService.weights.length" fxLayout="column">
          <br>
          <mat-toolbar [ngClass]="{'boy': childService.child.gender === 'male',
                                   'girl': childService.child.gender === 'female'}">
            <mat-toolbar-row>
              <span>Weight History</span>
              <span fxFlex></span>
              <button mat-icon-button *ngIf="!isChartVisible && childService.weights.length > 1"
                      (click)="isChartVisible = true" matTooltip="Show Chart">
                <mat-icon>show_chart</mat-icon>
              </button>
              <button mat-icon-button *ngIf="isChartVisible" (click)="isChartVisible = false"
                      matTooltip="Show Table">
                <mat-icon>list</mat-icon>
              </button>
              <button mat-icon-button [disabled]="!selection.hasValue()"
                      matTooltip="Delete selected" (click)="onRemove(selection.selected)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-toolbar-row>
          </mat-toolbar>
          <app-chart *ngIf="isChartVisible" [name]="childService.child.name" [series]="chartData"
                     [scheme]="childService.child.gender === 'male' ? childService.boyScheme : childService.girlScheme"
                     [yAxisLabel]="unitsControl.value"></app-chart>
          <mat-table #table [dataSource]="dataSource" matSort matSortActive="date"
                     matSortDirection="desc" *ngIf="!isChartVisible">
            <!-- Checkbox Column -->
            <ng-container matColumnDef="select">
              <mat-header-cell *matHeaderCellDef>
                <mat-checkbox (change)="$event ? masterToggle() : null"
                              [checked]="selection.hasValue() && isAllSelected()"
                              [indeterminate]="selection.hasValue() && !isAllSelected()">
                </mat-checkbox>
              </mat-header-cell>
              <mat-cell *matCellDef="let row">
                <mat-checkbox (click)="$event.stopPropagation()"
                              (change)="$event ? selection.toggle(row) : null"
                              [checked]="selection.isSelected(row)">
                </mat-checkbox>
              </mat-cell>
            </ng-container>
            <ng-container matColumnDef="pounds" *ngIf="unitsControl.value === 'lbs'">
              <mat-header-cell *matHeaderCellDef> Weight</mat-header-cell>
              <mat-cell *matCellDef="let weight">
                <span *ngIf="weight.pounds">{{(weight.pounds | number:'1.0-2') + ' lbs '}}</span>
                <span *ngIf="weight.pounds && weight.ounces">&nbsp;</span>
                <span *ngIf="weight.ounces">{{(weight.ounces | number:'1.0-2') + ' oz'}}</span>
              </mat-cell>
            </ng-container>
            <ng-container matColumnDef="kilograms" *ngIf="unitsControl.value === 'kg'">
              <mat-header-cell *matHeaderCellDef> Weight</mat-header-cell>
              <mat-cell *matCellDef="let weight"> {{(weight.kilograms | number:'1.0-2') + ' kg'}}
              </mat-cell>
            </ng-container>
            <ng-container matColumnDef="date">
              <mat-header-cell *matHeaderCellDef mat-sort-header> Date</mat-header-cell>
              <mat-cell *matCellDef="let weight"> {{weight.date | date }}</mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
          </mat-table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit, AfterViewInit {
  @Input() childService: ChildService;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  form: FormGroup;
  kilogramsControl = new FormControl(undefined);
  poundsControl = new FormControl(undefined);
  ouncesControl = new FormControl(undefined);
  unitsControl = new FormControl('lbs');
  dateControl = new FormControl(new Date());
  dataSource: MatTableDataSource<Weight>;
  poundColumns = ['select', 'pounds', 'date'];
  kilogramColumns = ['select', 'kilograms', 'date'];
  displayedColumns = this.poundColumns;
  selection = new SelectionModel<Weight>(true, []);
  isChartVisible = false;
  chartData: DateValue<number>[];

  constructor(fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = fb.group({
      kilograms: this.kilogramsControl,
      pounds: this.poundsControl,
      ounces: this.ouncesControl,
      units: this.unitsControl,
      date: this.dateControl
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Weight>(this.childService.weights);
    this.chartData = this.childService.getWeightSeriesData(this.unitsControl.value);

    this.unitsControl.valueChanges
    .subscribe((value: WeightSystem) => {
      if (value === WeightSystem.METRIC) {
        this.displayedColumns = this.kilogramColumns;
        this.poundsControl.setValue(undefined);
        this.ouncesControl.setValue(undefined);
      } else {
        this.displayedColumns = this.poundColumns;
        this.kilogramsControl.setValue(undefined);
      }
      this.form.markAsPristine();
      this.chartData = this.childService.getWeightSeriesData(value);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  resetForm(units?: WeightSystem) {
    this.form.reset({
      kilograms: undefined,
      pounds: undefined,
      ounces: undefined,
      units: units ? units : 'lbs',
      date: new Date()
    });
  }

  onAddWeightEntry() {
    this.childService.addWeightEntry(this.form.getRawValue());
    this.resetForm(this.unitsControl.value);
    this.updateTable();
    this.snackBar.open(`Weight saved.`, '', { duration: 1000 });
  }

  onRemove(weights: Weight[]) {
    if (this.childService.removeWeightEntries(weights)) {
      this.snackBar.open(`${weights.length > 1 ? 'Weight entries' : 'Weight entry'} removed.`,
        '', { duration: 2000 });
    } else {
      console.error('Failed to remove all weights requested.');
    }
    this.updateTable(true);
  }

  updateTable(resetSelection?: boolean) {
    this.dataSource = new MatTableDataSource<Weight>(this.childService.weights);
    this.dataSource.sort = this.sort;
    if (resetSelection) {
      this.selection = new SelectionModel<Weight>(true, []);
    }
    this.chartData = this.childService.getWeightSeriesData(this.unitsControl.value);
  }

  /**
   * @returns {boolean} Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
