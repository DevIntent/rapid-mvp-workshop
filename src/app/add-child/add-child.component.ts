import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Child, ChildrenService } from '../children.service';

@Component({
  selector: 'app-add-child',
  template: `
    <div class="container" fxLayout="column" fxLayoutAlign="start center">
      <app-children *ngIf="childrenService.getChildren()?.length"></app-children>
      <div id="genderSelection" fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="center center"
           fxLayoutGap="24px" *ngIf="!child?.gender" fxFlex
           [ngClass]="childrenService.getChildren()?.length ? 'belowChildren' : ''">
        <mat-card id="boy" (click)="addBoy()" aria-label="Add a boy">
          <mat-card-content fxLayout="row" fxLayoutAlign="center center">
            <app-avatar gender="male" [emoji]="defaultBoyEmoji" opacity="0.7"></app-avatar>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button color="primary">Add a boy</button>
          </mat-card-actions>
        </mat-card>
        <mat-card id="girl" (click)="addGirl()" aria-label="Add a girl">
          <mat-card-content fxLayout="row" fxLayoutAlign="center center">
            <app-avatar gender="female" [emoji]="defaultGirlEmoji" opacity="0.7"></app-avatar>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button color="accent">Add a girl</button>
          </mat-card-actions>
        </mat-card>
      </div>
      <form fxLayout="column" fxLayoutAlign="center center" [formGroup]="form"
            *ngIf="child?.gender">
        <mat-card fxLayout="column">
          <mat-card-content>
            <mat-form-field color="accent">
              <input matInput #nameInput type="text" placeholder="Name" [formControl]="nameControl">
            </mat-form-field>
            <mat-form-field color="accent">
              <input matInput [matDatepicker]="picker" placeholder="Date of Birth" [formControl]="dobControl">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button type="button" color="primary" (click)="onCancel()">Cancel</button>
            <button mat-button color="primary" (click)="onSave()">Save</button>
          </mat-card-actions>
        </mat-card>
      </form>
    </div>
  `,
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  child: Child;
  form: FormGroup;
  defaultBoyEmoji = '👦🏽';
  defaultGirlEmoji = '👧🏽';
  nameControl = new FormControl('');
  dobControl = new FormControl('');

  constructor(private router: Router,
              private fb: FormBuilder,
              public childrenService: ChildrenService) {
    this.form = this.fb.group({
      name: this.nameControl,
      dob: this.dobControl
    });
  }

  ngOnInit() {
  }

  addBoy() {
    this.child = {name: '', gender: 'male', emoji: this.defaultBoyEmoji};
    this.focusNameInput();
  }

  addGirl() {
    this.child = {name: '', gender: 'female', emoji: this.defaultGirlEmoji};
    this.focusNameInput();
  }

  focusNameInput() {
    setTimeout(() => {
      if (this.nameInput && this.nameInput.nativeElement) {
        this.nameInput.nativeElement.focus();
      }
    });
  }

  onSave() {
    const child = Object.assign(this.child, this.form.getRawValue());
    this.childrenService.addChild(child);
    this.clearChild();
  }

  onCancel() {
    this.clearChild();
  }

  clearChild() {
    this.child = undefined;
    this.form.reset();
  }
}
