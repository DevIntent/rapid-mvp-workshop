import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-emoji-picker',
  template: `
    <mat-form-field [color]="color">
      <mat-select [formControl]="control" placeholder="Icon">
        <ng-container *ngIf="gender === 'male'">
          <mat-option *ngFor="let emoji of boyEmojis" [value]="emoji">{{emoji}}</mat-option>
        </ng-container>
        <ng-container *ngIf="gender === 'female'">
          <mat-option *ngFor="let emoji of girlEmojis" [value]="emoji">{{emoji}}</mat-option>
        </ng-container>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent implements OnInit {
  @Input() gender: string;
  @Input() control: FormControl;
  @Input() color: string;
  girlEmojis = [
    '👧',
    '👧🏻',
    '👧🏼',
    '👧🏽',
    '👧🏾',
    '👧🏿'
  ];
  boyEmojis = [
    '👦',
    '👦🏻',
    '👦🏼',
    '👦🏽',
    '👦🏾',
    '👦🏿'
  ];

  constructor() {
  }

  ngOnInit() {
    this.control.setValue(this.gender === 'male' ? this.boyEmojis[0] : this.girlEmojis[0]);
  }
}
