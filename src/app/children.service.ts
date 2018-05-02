import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../environments/environment';

export interface Child {
  name: string;
  gender: string;
  dob?: Date;
  emoji?: string;
}

@Injectable()
export class ChildrenService {
  private children: Child[] = [];
  isLocalStorageSupported: boolean;

  constructor() {
    this.isLocalStorageSupported = ChildrenService.checkIfLocalStorageSupported();
    if (this.isLocalStorageSupported) {
      const childrenFromLocalStorage = JSON.parse(localStorage.getItem('children'));
      if (Array.isArray(childrenFromLocalStorage)) {
        this.children = childrenFromLocalStorage;
      } else {
        if (environment.production) {
          this.children = [];
        } else {
          this.children = ChildrenService.getMockChildrenData();
        }
      }
    }
  }

  /**
   * @param child entry to add to the set of children
   */
  addChild(child: Child) {
    this.children.push(child);
    if (this.isLocalStorageSupported) {
      localStorage.setItem('children', JSON.stringify(this.children));
    }
  }

  /**
   * @returns {any[]} current set of children
   */
  getChildren(): Child[] {
    return this.children;
  }

  /**
   * @param {string} name of child to return
   * @returns {Child} whose name was specified or undefined if not found
   */
  getChild(name: string): Child {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name === name) {
        return this.children[i];
      }
    }
  }

  /**
   * @param {Date} dob date of birth
   * @returns {string} years and months of age
   */
  getAge(dob: Date): string {
    const dateOfBirth = moment(dob);
    const now = moment(new Date());
    const years = now.diff(dateOfBirth, 'years', false);
    const months = now.subtract(years, 'years').diff(dateOfBirth, 'months', false);
    let result = '';
    if (years) {
      if (years === 1) {
        result += `${years} year`;
      } else {
        result += `${years} years`;
      }
    }
    if (years && months) {
      result += ', ';
    }
    if (months) {
      if (months === 1) {
        result += `${months} month`;
      } else {
        result += `${months} months`;
      }
    }
    return result;
  }

  /**
   * @returns {boolean} true if the localStorage HTML5 API is supported in this browser
   */
  static checkIfLocalStorageSupported() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  static getMockChildrenData(): Child[] {
    return [
      {name: 'Tina', gender: 'female', emoji: '👧🏽', dob: new Date('2017-02-03T05:00:00.000Z')},
      {name: 'Andrew', gender: 'male', emoji: '👦🏻', dob: new Date('2017-02-03T05:00:00.000Z')}
    ];
  }
}
