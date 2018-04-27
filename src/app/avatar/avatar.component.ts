import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="container" [ngClass]="gender === 'male' ? 'boy' : 'girl'" fxLayout="row" fxLayoutAlign="center center"
         [style.opacity]="opacity">
      <span class="emoji-icon">{{emoji}}</span>
    </div>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() gender: string;
  @Input() emoji: string;
  @Input() opacity?: number;

  constructor() { }

  ngOnInit() {
  }
}
