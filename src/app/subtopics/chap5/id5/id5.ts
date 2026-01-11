import { Component, OnInit } from '@angular/core';
import { makeBlobs } from '../../../utils/makeBlobs';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType  } from '@swimlane/ngx-charts';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-id5',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    NgxChartsModule,
    MatSelectModule
  ],
  templateUrl: './id5.html',
  styleUrls: ['./id5.css'],
})
export class Id5 implements OnInit {

  // --- Data Setup ---
  samples = 1000;
  clusters = 4;
  dispersion = 0.8;

  // --- Algorithm ---
  targetSize = 8;
  epsilon = 0.02;

  // --- State ---
  data: number[][] = [];
  codebook: number[][] = [];
  regionCodebook: number[][] = [];
  history: number[] = [];
  centroidsHistory: number[][][] = [];
  stage: string = 'Init';

  // --- Chart Data ---
  scatterData: any[] = [];
  distortionData: any[] = [];

  // --- Color Schemes ---
  colorScheme: Color = {
    name: 'scatterColors',
    selectable: true,
    group: ScaleType.Ordinal,    // only linear is allowed now
    domain: ['#007bff', '#ff0000', '#6c757d', '#28a745', '#fd7e14', '#6610f2']
  };

  lineColorScheme: Color = {
    name: 'lineColors',
    selectable: true,
     group: ScaleType.Linear, 
    domain: ['#007bff', '#ff0000', '#6c757d']
  };

  constructor() { }

  ngOnInit(): void {
    this.generateData();
  }

  generateData(): void {
    const { X } = makeBlobs(this.samples, this.clusters, this.dispersion);
    this.data = X;
    this.codebook = [this.meanPoint(X)];
    this.regionCodebook = this.codebook;
    this.history = [];
    this.centroidsHistory = [];
    this.stage = 'Init';
    this.updateScatterData();
    this.updateDistortionData();
  }

  meanPoint(points: number[][]): number[] {
    const dim = points[0].length;
    const mean: number[] = Array(dim).fill(0);
    for (let p of points) for (let i = 0; i < dim; i++) mean[i] += p[i];
    return mean.map(v => v / points.length);
  }

  getDistortion(X: number[][], cb: number[][]): number {
    let total = 0;
    for (let x of X) {
      const dists = cb.map(c => x.reduce((sum, val, i) => sum + (val - c[i]) ** 2, 0));
      total += Math.min(...dists);
    }
    return total / X.length;
  }

  stepKMeans(X: number[][], cb: number[][]): number[][] {
    const labels = X.map(x => {
      const dists = cb.map(c => x.reduce((sum, val, i) => sum + (val - c[i]) ** 2, 0));
      return dists.indexOf(Math.min(...dists));
    });

    const newCb: number[][] = [];
    for (let i = 0; i < cb.length; i++) {
      const pts = X.filter((_, idx) => labels[idx] === i);
      if (pts.length) newCb.push(this.meanPoint(pts));
      else newCb.push(X[Math.floor(Math.random() * X.length)]);
    }
    return newCb;
  }

  split(cb: number[][], eps: number): number[][] {
    const newCb: number[][] = [];
    for (let v of cb) {
      newCb.push(v.map(x => x * (1 + eps)));
      newCb.push(v.map(x => x * (1 - eps)));
    }
    return newCb;
  }

  doubleN(): void {
    if (this.codebook.length >= this.targetSize) return;
    this.centroidsHistory = [JSON.parse(JSON.stringify(this.codebook))];
    this.codebook = this.split(this.codebook, this.epsilon);
    this.stage = 'Split';

    for (let i = 0; i < 10; i++) {
      const newCb = this.stepKMeans(this.data, this.codebook);
      this.centroidsHistory.push(JSON.parse(JSON.stringify(newCb)));
      this.codebook = newCb;
      this.history.push(this.getDistortion(this.data, this.codebook));
      if (JSON.stringify(this.codebook) === JSON.stringify(newCb)) break;
    }

    this.regionCodebook = this.codebook;
    this.stage = 'Optimized';
    this.updateScatterData();
    this.updateDistortionData();
  }

  reset(): void {
    this.generateData();
  }

  updateScatterData(): void {
    // Convert data to bubble chart format
    this.scatterData = [
      {
        name: 'Data',
        series: this.data.map(p => ({ name: String(p[0]), x: p[0], y: p[1], r: 5 }))
      },
      {
        name: 'Centroids',
        series: this.codebook.map(p => ({ name: String(p[0]), x: p[0], y: p[1], r: 8 }))
      }
    ];
  }

  updateDistortionData(): void {
    this.distortionData = [
      {
        name: 'MSE',
        series: this.history.map((val, idx) => ({ name: String(idx), value: val }))
      }
    ];
  }

}
