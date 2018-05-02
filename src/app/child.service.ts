import { Injectable } from '@angular/core';
import { Child, ChildrenService } from './children.service';
import { DateValue } from './chart/date-value';
import { environment } from '../environments/environment';

export enum WeightUnit {
  LBS = 'lbs',
  KGS = 'kg'
}

export enum HeightUnit {
  FEET = 'ft',
  METERS = 'm'
}

export interface Weight {
  value: number;
  units?: WeightUnit;
  date?: Date;
}

export interface Height {
  meters?: number;
  feet?: number;
  inches?: number;
  units?: HeightUnit;
  date?: Date;
}

@Injectable()
export class ChildService {
  child: Child;
  weights: Weight[] = [];
  heights: Height[] = [];
  girlScheme = {
    domain: ['#f06292', '#f8bbd0', '#d81b60']
  };
  boyScheme = {
    domain: ['#4dd0e1', '#b2ebf2', '#00acc1']
  };

  constructor(private childrenService: ChildrenService) {
  }

  /**
   * @param {Child} child the child model used to initialize this service
   */
  setChild(child: Child) {
    this.child = child;

    if (this.childrenService.isLocalStorageSupported) {
      const weights = JSON.parse(localStorage.getItem(`${this.child.name}-weights`));
      if (Array.isArray(weights)) {
        weights.forEach((weight) => {
          weight.date = new Date(weight.date);
        });
        this.weights = weights;
      } else {
        if (environment.production) {
          this.weights = [];
        } else {
          this.weights = ChildService.getMockWeights();
        }
      }
    }

    if (this.childrenService.isLocalStorageSupported) {
      const heights = JSON.parse(localStorage.getItem(`${this.child.name}-heights`));
      if (Array.isArray(heights)) {
        heights.forEach((height) => {
          height.date = new Date(height.date);
        });
        this.heights = heights;
      } else {
        if (environment.production) {
          this.heights = [];
        } else {
          this.heights = ChildService.getMockHeights();
        }
      }
    }
  }

  getWeightSeriesData(): DateValue<number>[] {
    const values = [];
    this.weights.forEach((weight: Weight) => {
      values.push({name: weight.date, value: weight.value});
    });
    return values;
  }

  /**
   * @param {Weight} weight to add
   */
  addWeightEntry(weight: Weight) {
    if (weight.units === undefined) {
      weight.units = WeightUnit.LBS;
    }
    if (weight.date === undefined) {
      weight.date = new Date();
    }
    this.weights.unshift(weight);
    this.saveWeights(this.weights);
  }

  /**
   * @param {Weight[]} weights object to remove
   * @returns {boolean} true if all of the weights were found and removed
   */
  removeWeightEntries(weights: Weight[]): boolean {
    let removedCount = 0;
    weights.map((weight: Weight) => {
      if (this.removeWeightEntry(weight)) {
        removedCount++;
      }
    });
    return removedCount === weights.length;
  }

  /**
   * @param {Weight} weight object to remove
   * @returns {boolean} true if the weight was found and removed
   */
  removeWeightEntry(weight: Weight): boolean {
    let removed = false;
    for (let i = 0; i < this.weights.length; i++) {
      if (Object.is(this.weights[i], weight)) {
        this.weights.splice(i, 1);
        removed = true;
      }
    }
    if (removed) {
      this.saveWeights(this.weights);
    }
    return removed;
  }

  saveWeights(weights: Weight[]) {
    if (this.childrenService.isLocalStorageSupported) {
      localStorage.setItem(`${this.child.name}-weights`, JSON.stringify(weights));
    }
  }

  getHeightSeriesData(): DateValue<number>[] {
    const values = [];
    this.heights.forEach((height: Height) => {
      let value;
      if (height.units === HeightUnit.FEET) {
        value = height.feet + height.inches / 12;
      } else {
        value = height.meters;
      }
      values.push({name: height.date, value: value});
    });
    return values;
  }

  /**
   * @param {Height} height to add
   */
  addHeightEntry(height: Height) {
    if (height.units === undefined) {
      height.units = HeightUnit.FEET;
    }
    if (height.date === undefined) {
      height.date = new Date();
    }
    if (!height.feet) {
      height.feet = 0;
    }
    if (!height.inches) {
      height.inches = 0;
    }
    if (!height.meters) {
      height.meters = 0;
    }
    if (height.units === HeightUnit.FEET) {
      height.meters = height.feet * 0.3048 + height.inches * 0.0254;
    } else {
      height.feet = height.meters * 3.28084;
    }
    this.heights.unshift(height);
    this.saveHeights(this.heights);
  }

  /**
   * @param {Height[]} heights object to remove
   * @returns {boolean} true if all of the heights were found and removed
   */
  removeHeightEntries(heights: Height[]): boolean {
    let removedCount = 0;
    heights.map((height: Height) => {
      if (this.removeHeightEntry(height)) {
        removedCount++;
      }
    });
    return removedCount === heights.length;
  }

  /**
   * @param {Height} height object to remove
   * @returns {boolean} true if the height was found and removed
   */
  removeHeightEntry(height: Height): boolean {
    let removed = false;
    for (let i = 0; i < this.heights.length; i++) {
      if (Object.is(this.heights[i], height)) {
        this.heights.splice(i, 1);
        removed = true;
      }
    }
    if (removed) {
      this.saveHeights(this.heights);
    }
    return removed;
  }

  saveHeights(heights: Height[]) {
    if (this.childrenService.isLocalStorageSupported) {
      localStorage.setItem(`${this.child.name}-heights`, JSON.stringify(heights));
    }
  }

  static getMockWeights(): Weight[] {
    return [
      {value: 21.7, units: WeightUnit.LBS, date: new Date("2018-04-15T04:00:00.000Z")},
      {value: 18.9, units: WeightUnit.LBS, date: new Date("2018-01-01T05:00:00.000Z")},
      {value: 14.74, units: WeightUnit.LBS, date: new Date("2017-07-03T04:00:00.000Z")},
      {value: 18.3, units: WeightUnit.LBS, date: new Date("2017-10-30T04:00:00.000Z")},
      {value: 9.274, units: WeightUnit.LBS, date: new Date("2017-04-01T04:00:00.000Z")},
      {value: 7.4, units: WeightUnit.LBS, date: new Date("2017-01-28T05:00:00.000Z")}
    ];
  }

  static getMockHeights(): Height[] {
    return [
      {meters: 0.8128, feet: 0, inches: 32, units: HeightUnit.FEET, date: new Date('2018-04-15T04:00:00.000Z')},
      {meters: 0.7874, feet: 0, inches: 31, units: HeightUnit.FEET, date: new Date('2018-01-01T05:00:00.000Z')},
      {meters: 0.75184, feet: 0, inches: 29.6, units: HeightUnit.FEET, date: new Date('2017-10-30T04:00:00.000Z')},
      {meters: 0.67564, feet: 0, inches: 26.6, units: HeightUnit.FEET, date: new Date('2017-07-03T04:00:00.000Z')},
      {meters: 0.5715, feet: 0, inches: 22.5, units: HeightUnit.FEET, date: new Date('2017-03-28T04:00:00.000Z')},
      {meters: 0.508, feet: 0, inches: 20, units: HeightUnit.FEET, date: new Date('2017-01-28T05:00:00.000Z')}
    ];
  }
}
