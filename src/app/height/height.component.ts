import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChildService, Height, HeightSystem } from '../child.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DateValue } from '../chart/date-value';

@Component({
  selector: 'app-height',
  template: `
    <mat-card>
      <mat-card-title>Height Tracker</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" fxLayout="column">
          <div class="feetContainer" fxLayout="row" *ngIf="unitsControl.value === 'ft'">
            <mat-form-field class="feetInput">
              <input matInput type="number" [formControl]="feetControl" min="0"
                     placeholder="Feet">
            </mat-form-field>
            <mat-form-field>
              <input matInput type="number" [formControl]="inchesControl" min="0"
                     placeholder="Inches">
            </mat-form-field>
          </div>
          <mat-form-field *ngIf="unitsControl.value === 'm'">
            <input matInput type="number" [formControl]="metersControl" min="0"
                   placeholder="Meters">
          </mat-form-field>
          <mat-form-field>
            <mat-select [formControl]="unitsControl" placeholder="Units">
              <mat-option value="ft">Standard</mat-option>
              <mat-option value="m">Metric</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <input matInput [matDatepicker]="picker" placeholder="Date of Measurement"
                   [formControl]="dateControl">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-button (click)="onAddHeightEntry()" color="primary"
                  [disabled]="form.pristine || form.invalid">Save
          </button>
        </form>
        <div class="tableContainer" *ngIf="childService.heights.length" fxLayout="column">
          <br>
          <mat-toolbar [ngClass]="{'boy': childService.child.gender === 'male',
                                   'girl': childService.child.gender === 'female'}">
            <mat-toolbar-row>
              <span>Height History</span>
              <span fxFlex></span>
              <button mat-icon-button *ngIf="!isChartVisible && childService.heights.length > 1"
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
            <ng-container matColumnDef="feet" *ngIf="unitsControl.value === 'ft'">
              <mat-header-cell *matHeaderCellDef> Height</mat-header-cell>
              <mat-cell *matCellDef="let height">
                <span *ngIf="height.feet">{{(height.feet | number:'1.0-2') + ' ft '}}</span>
                <span *ngIf="height.feet && height.inches">&nbsp;</span>
                <span *ngIf="height.inches">{{(height.inches | number:'1.0-2') + ' in'}}</span>
              </mat-cell>
            </ng-container>
            <ng-container matColumnDef="meters" *ngIf="unitsControl.value === 'm'">
              <mat-header-cell *matHeaderCellDef> Height</mat-header-cell>
              <mat-cell *matCellDef="let height"> {{(height.meters | number:'1.0-2') + ' m'}}
              </mat-cell>
            </ng-container>
            <ng-container matColumnDef="date">
              <mat-header-cell *matHeaderCellDef mat-sort-header> Date</mat-header-cell>
              <mat-cell *matCellDef="let height"> {{height.date | date }}</mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
          </mat-table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./height.component.scss']
})
export class HeightComponent implements OnInit, AfterViewInit {
  @Input() childService: ChildService;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  form: FormGroup;
  metersControl = new FormControl(undefined);
  feetControl = new FormControl(undefined);
  inchesControl = new FormControl(undefined);
  unitsControl = new FormControl('ft');
  dateControl = new FormControl(new Date());
  dataSource: MatTableDataSource<Height>;
  feetColumns = ['select', 'feet', 'date'];
  meterColumns = ['select', 'meters', 'date'];
  displayedColumns = this.feetColumns;
  selection = new SelectionModel<Height>(true, []);
  isChartVisible = false;
  chartData: DateValue<number>[];

  constructor(fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = fb.group({
      meters: this.metersControl,
      feet: this.feetControl,
      inches: this.inchesControl,
      units: this.unitsControl,
      date: this.dateControl
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Height>(this.childService.heights);
    this.chartData = this.childService.getHeightSeriesData(this.unitsControl.value);

    this.unitsControl.valueChanges
    .subscribe((value: HeightSystem) => {
      if (value === HeightSystem.METRIC) {
        this.displayedColumns = this.meterColumns;
        this.feetControl.setValue(undefined);
        this.inchesControl.setValue(undefined);
      } else {
        this.displayedColumns = this.feetColumns;
        this.metersControl.setValue(undefined);
      }
      this.form.markAsPristine();
      this.chartData = this.childService.getHeightSeriesData(value);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  resetForm(units?: string) {
    this.form.reset({
      meters: undefined,
      feet: undefined,
      inches: undefined,
      units: units ? units : 'ft',
      date: new Date()
    });
  }

  onAddHeightEntry() {
    this.childService.addHeightEntry(this.form.getRawValue());
    this.resetForm(this.unitsControl.value);
    this.updateTable();
    this.snackBar.open(`Height saved.`, '', { duration: 1000 });
  }

  onRemove(heights: Height[]) {
    if (this.childService.removeHeightEntries(heights)) {
      this.snackBar.open(`${heights.length > 1 ? 'Height entries' : 'Height entry'} removed.`,
        '', { duration: 2000 });
    } else {
      console.error('Failed to remove all heights requested.');
    }
    this.updateTable(true);
  }

  updateTable(resetSelection?: boolean) {
    this.dataSource = new MatTableDataSource<Height>(this.childService.heights);
    this.dataSource.sort = this.sort;
    if (resetSelection) {
      this.selection = new SelectionModel<Height>(true, []);
    }
    this.chartData = this.childService.getHeightSeriesData(this.unitsControl.value);
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
