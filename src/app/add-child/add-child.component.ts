import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-child',
  template: `
    <div id="genderSelection" fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="center center" fxFill
         fxLayoutGap="24px" *ngIf="!child?.gender">
      <mat-card id="boy" (click)="addBoy()">
        <mat-card-content fxLayout="row" fxLayoutAlign="center center">
          <mat-icon>child_care</mat-icon>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button color="primary">Add a boy</button>
        </mat-card-actions>
      </mat-card>
      <mat-card id="girl" (click)="addGirl()">
        <mat-card-content fxLayout="row" fxLayoutAlign="center center">
          <mat-icon>child_care</mat-icon>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button color="accent">Add a girl</button>
        </mat-card-actions>
      </mat-card>
    </div>
    <form fxLayout="column" fxLayoutAlign="center center" fxFill [formGroup]="form" *ngIf="child?.gender">
      <mat-card fxLayout="column">
        <mat-card-content>
          <mat-form-field color="accent">
            <input matInput type="text" placeholder="Name" formControlName="name">
          </mat-form-field>
          <mat-form-field color="accent">
            <input matInput [matDatepicker]="picker" placeholder="Date of Birth" formControlName="dob">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button color="accent" (click)="onSave()">Save</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnInit {
  child: any;
  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      dob: ''
    });
  }

  ngOnInit() {
  }

  addBoy() {
    this.child = {gender: 'male'};
  }

  addGirl() {
    this.child = {gender: 'female'};
  }

  onSave() {
    Object.assign(this.child, this.form.getRawValue());
    console.log(this.child);
  }
}
