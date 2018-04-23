import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  template: `
    <mat-toolbar color="primary">
      <img src="/assets/llama-white-250px.png" alt="Firegrow Logo" id="logo">

      <a aria-label="Home" [routerLink]="['']">
        <h1 class="mat-h1">Firegrow</h1>
      </a>
    </mat-toolbar>
  `,
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
