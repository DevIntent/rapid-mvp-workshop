import { Injectable } from '@angular/core';
import { Child, ChildrenService } from './children.service';

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
        this.weights = weights;
      } else {
        this.weights = [];
      }
    }

    if (this.childrenService.isLocalStorageSupported) {
      const heights = JSON.parse(localStorage.getItem(`${this.child.name}-heights`));
      if (Array.isArray(heights)) {
        this.heights = heights;
      } else {
        this.heights = [];
      }
    }
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
}
