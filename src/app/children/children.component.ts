import { Component, OnInit } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children',
  template: `
    <div fxLayout="column" fxLayout.gt-sm="row wrap" fxLayoutAlign="start center" fxLayoutGap="24px">
      <mat-card *ngFor="let child of childrenService.children" (click)="onChildOpen(child)"
                aria-label="View Child">
        <mat-card-title>{{child.name}}</mat-card-title>
        <mat-card-content>
          <app-avatar [gender]="child.gender" [emoji]="child.emoji"></app-avatar>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  constructor(public childrenService: ChildrenService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onChildOpen(child) {
    this.router.navigate(['child', child.name]);
  }
}
