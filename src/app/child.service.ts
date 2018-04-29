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

  removeWeightEntry(index: number) {
    this.weights = this.weights.splice(index, 1);
    this.saveWeights(this.weights);
  }

  saveWeights(weights: Weight[]) {
    if (this.childrenService.isLocalStorageSupported) {
      localStorage.setItem(`${this.child.name}-weights`, JSON.stringify(weights));
    }
  }

  addHeightEntry(height: Height) {
    if (height.units === undefined) {
      height.units = HeightUnit.FEET;
    }
    if (height.date === undefined) {
      height.date = new Date();
    }
    if (height.units === HeightUnit.FEET) {
      height.meters = height.feet * 0.3048 + height.inches * 0.0254;
    } else {
      height.feet = height.meters * 3.28084;
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
    this.heights.unshift(height);
    this.saveHeights(this.heights);
  }

  removeHeightEntry(index: number) {
    this.heights = this.heights.splice(index, 1);
    this.saveHeights(this.heights);
  }

  saveHeights(heights: Height[]) {
    if (this.childrenService.isLocalStorageSupported) {
      localStorage.setItem(`${this.child.name}-heights`, JSON.stringify(heights));
    }
  }
}
