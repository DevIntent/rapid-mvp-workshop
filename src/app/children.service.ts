import { Injectable } from '@angular/core';

@Injectable()
export class ChildrenService {
  children: any[] = [];

  constructor() { }

  addChild(child) {
    this.children.push(child);
  }

  getChildren(): any[] {
    return this.children;
  }
}
