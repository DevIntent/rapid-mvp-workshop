import { Component, OnInit } from '@angular/core';
import { Location as NgLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  showBackButton = false;

  constructor(private ngLocation: NgLocation) {}

  ngOnInit() {}

  public back() {
    this.ngLocation.back();
  }
}
