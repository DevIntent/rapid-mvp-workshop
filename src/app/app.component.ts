import { Component, OnInit, ViewChild } from '@angular/core';
import { Location as NgLocation } from '@angular/common';
import { MatDrawerContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #appDrawer mode="over" opened="false">
        <div class="sidenav-toolbar"></div>

        <mat-nav-list>
          <mat-list-item (click)="closeNav()" [routerLink]="['']" routerLinkActive="active"
                        [routerLinkActiveOptions]="{exact: true}">
            <mat-icon>home</mat-icon>
            Home
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>
      <mat-toolbar color="primary">
        <button mat-icon-button id="menu" (click)="openNav()" *ngIf="!showBackButton" aria-label="menu">
          <mat-icon>menu</mat-icon>
        </button>
        <button mat-icon-button id="back" (click)="back()" *ngIf="showBackButton" aria-label="back">
          <mat-icon>arrow_back</mat-icon>
        </button>

        <a aria-label="Home" [routerLink]="['']">
          <h1 class="mat-h1">Firegrow</h1>
        </a>
      </mat-toolbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </mat-sidenav-container>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: MatDrawerContainer;
  showBackButton = false;

  constructor(private ngLocation: NgLocation) {}

  ngOnInit() {}

  openNav() {
    this.appDrawer.open();
  }

  closeNav() {
    this.appDrawer.close();
  }

  public back() {
    this.ngLocation.back();
  }
}
