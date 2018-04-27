import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-child-details',
  template: `
    <div>
      {{name}}
    </div>
  `,
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {
  name: string;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.name = paramMap.get('name');
    });
  }

  ngOnInit() {
  }
}
