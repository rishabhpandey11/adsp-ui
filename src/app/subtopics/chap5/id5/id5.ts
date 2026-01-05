import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-id5',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSliderModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './id5.html',
  styleUrls: ['./id5.css'],
})
export class Id5 implements OnInit {
  // === Data Setup Section ===
  dispersion = 1;
  clusters = 4;
  samples = 200;

  // === Algorithm Section ===
  targetN = 8;
  splittingNoise = 0.05;

  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private xScale!: d3.ScaleLinear<number, number>;
  private yScale!: d3.ScaleLinear<number, number>;
  private voronoiDiagram: any;
  dataPoints: Point[] = [];
  centroids: Point[] = [];
  distortion = 0;

  ngOnInit() {
    this.createChart();
    this.updateChart();
  }

  /** Initialize SVG and axes */
  createChart() {
    const width = 700;
    const height = 400;

    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.xScale = d3.scaleLinear().domain([0, 10]).range([50, width - 20]);
    this.yScale = d3.scaleLinear().domain([0, 10]).range([height - 50, 20]);

    // Axes
    this.svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('transform', 'translate(50,0)')
      .call(d3.axisLeft(this.yScale));

    // Voronoi group
    this.svg.append('g').attr('class', 'voronoi');
  }

  /** Update chart points, centroids, Voronoi, and distortion */
  updateChart() {
    const width = 700;
    const height = 400;

    // 1️⃣ Generate random data points with dispersion
    this.dataPoints = Array.from({ length: this.samples }, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10
    }));

    // 2️⃣ Generate centroids
    this.centroids = Array.from({ length: this.clusters }, () => ({
      x: Math.random() * 10,
      y: Math.random() * 10
    }));

    // 3️⃣ Bind data points
    const points = this.svg.selectAll<SVGCircleElement, Point>('.data-point').data(this.dataPoints);
    points.join('circle')
      .attr('class', 'data-point')
      .attr('cx', (d: Point) => this.xScale(d.x))
      .attr('cy', (d: Point) => this.yScale(d.y))
      .attr('r', 4)
      .attr('fill', '#3b82f6')
      .attr('opacity', 0.7);

    // 4️⃣ Bind centroids
    const cent = this.svg.selectAll<SVGCircleElement, Point>('.centroid').data(this.centroids);
    cent.join('circle')
      .attr('class', 'centroid')
      .attr('cx', (d: Point) => this.xScale(d.x))
      .attr('cy', (d: Point) => this.yScale(d.y))
      .attr('r', 8)
      .attr('fill', '#ef4444')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5);

    // 5️⃣ Compute Voronoi diagram
    this.voronoiDiagram = d3.Delaunay
      .from(this.centroids, d => this.xScale(d.x), d => this.yScale(d.y))
      .voronoi([50, 20, width - 20, height - 50]);

    const voronoiPaths = this.svg.select('.voronoi').selectAll('path').data(this.centroids);
    voronoiPaths.join('path')
      .attr('d', (_d, i) => this.voronoiDiagram.renderCell(i))
      .attr('fill', 'none')
      .attr('stroke', '#6b7280')
      .attr('stroke-width', 1);

    // 6️⃣ Compute distortion (MSE)
    this.distortion = this.computeDistortion();
  }

  /** Compute Mean Squared Error (MSE) of points to nearest centroid */
  computeDistortion(): number {
    let total = 0;
    this.dataPoints.forEach(p => {
      let minDist = Infinity;
      this.centroids.forEach(c => {
        if (!c) return;
        const dx = c.x - p.x;
        const dy = c.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < minDist) minDist = d2;
      });
      total += minDist;
    });
    return total / this.dataPoints.length;
  }

  /** Triggered on slider/input change */
  onInputChange() {
    this.updateChart();
  }
}
