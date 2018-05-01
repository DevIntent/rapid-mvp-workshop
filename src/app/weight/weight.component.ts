import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChildService, Weight } from '../child.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-weight',
  template: `
    <mat-card>
      <mat-card-title>Weight Tracker</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" fxLayout="column">
          <mat-form-field>
            <input matInput type="number" [formControl]="valueControl" required
                   placeholder="Weight">
          </mat-form-field>
          <mat-form-field>
            <mat-select [formControl]="unitsControl" placeholder="Units">
              <mat-option value="lbs">Pounds</mat-option>
              <mat-option value="kg">Kilograms</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <input matInput [matDatepicker]="picker" placeholder="Date of Measurement"
                   [formControl]="dateControl">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-button (click)="onAddWeightEntry()" color="primary" [disabled]="form.invalid">Save</button>
        </form>
        <div class="tableContainer" *ngIf="childService.weights.length">
          <br>
          <mat-toolbar [ngClass]="{'boy': childService.child.gender === 'male',
                                   'girl': childService.child.gender === 'female'}">
            <mat-toolbar-row>
              <span>Weight History</span>
              <span fxFlex></span>
              <button mat-icon-button [disabled]="!selection.hasValue()"
                      (click)="onRemove(selection.selected)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-toolbar-row>
          </mat-toolbar>
          <mat-table #table [dataSource]="dataSource" matSort matSortActive="date" matSortDirection="desc">
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
            <ng-container matColumnDef="value">
              <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>
              <mat-cell *matCellDef="let weight"> {{(weight.value | number:'1.0-2') + ' ' + weight.units}} </mat-cell>
            </ng-container>
            <ng-container matColumnDef="date">
              <mat-header-cell *matHeaderCellDef mat-sort-header> Date </mat-header-cell>
              <mat-cell *matCellDef="let weight"> {{weight.date | date }} </mat-cell>
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
  @ViewChild(MatSort) sort: MatSort;
  form: FormGroup;
  valueControl = new FormControl(undefined, Validators.required);
  unitsControl = new FormControl('lbs');
  dateControl = new FormControl(new Date());
  dataSource: MatTableDataSource<Weight>;
  displayedColumns = ['select', 'value', 'date'];
  selection = new SelectionModel<Weight>(true, []);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      value: this.valueControl,
      units: this.unitsControl,
      date: this.dateControl
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Weight>(this.childService.weights);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onAddWeightEntry() {
    this.childService.addWeightEntry(this.form.getRawValue());
    this.form.reset({value: undefined, units: 'lbs', date: new Date()});
    this.updateTable();
  }

  onRemove(weights: Weight[]) {
    if (this.childService.removeWeightEntries(weights)) {
    } else {
      // TODO Snackbar
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
