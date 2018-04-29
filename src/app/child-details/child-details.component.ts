import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Child, ChildrenService } from '../children.service';
import { ChildService } from '../child.service';

@Component({
  selector: 'app-child-details',
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="24px">
      <mat-card>
        <mat-card-title>{{childService.child.name}}</mat-card-title>
        <mat-card-content>
          <app-avatar [gender]="childService.child.gender" [emoji]="childService.child.emoji"
                      fxLayout="column" fxLayoutAlign="start center"></app-avatar>
          <div>
            <div><label>Age</label></div>
            <div class="age">{{age}}</div>
          </div>
        </mat-card-content>
      </mat-card>
      <app-weight [childService]="childService"></app-weight>
      <app-height [childService]="childService"></app-height>
    </div>
  `,
  styleUrls: ['./child-details.component.scss'],
  providers: [ChildService]
})
export class ChildDetailsComponent implements OnInit {
  childService: ChildService;
  age: string;

  constructor(private route: ActivatedRoute,
              private childrenService: ChildrenService,
              childService: ChildService) {
    this.childService = childService;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.childService.setChild(this.childrenService.getChild(paramMap.get('name')));
      this.age = childrenService.getAge(this.childService.child.dob);
    });
  }

  ngOnInit() {
  }
}
