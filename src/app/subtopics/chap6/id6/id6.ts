import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-id6',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './id6.html',
  styleUrls: ['./id6.css']
})
export class Id6 implements OnInit {

  /* ===== Slider ===== */
  downsampleFactor = 1;

  /* ===== Signal params ===== */
  fs = 8000;
  f0 = 150;
  duration = 0.02; // extra zoomed (20 ms)

  /* ===== Charts ===== */
  timeData: any[] = [];
  freqData: any[] = [];

  viewTime: [number, number] = [900, 300];
  viewFreq: [number, number] = [900, 300];

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  animations = false;
  


  ngOnInit() {
    this.updateSignals();
  }

  onChange() {
    this.updateSignals();
  }


  /* ================= SIGNAL PROCESSING ================= */

  updateSignals() {
    const N = Math.floor(this.fs * this.duration);
    const t: number[] = [];
    const original: number[] = [];

    for (let n = 0; n < N; n++) {
      const time = n / this.fs;
      t.push(time);
      original.push(Math.sign(Math.sin(2 * Math.PI * this.f0 * time)));
    }

    const down = original.filter((_, i) => i % this.downsampleFactor === 0);
    const tDown = down.map((_, i) => i / (this.fs / this.downsampleFactor));

    this.timeData = [
      {
        name: 'Original',
        series: t.map((x, i) => ({ name: x, value: original[i] }))
      },
      {
        name: `Downsampled ×${this.downsampleFactor}`,
        series: tDown.map((x, i) => ({ name: x, value: down[i] }))
      }
    ];

    this.freqData = [
      {
        name: 'Original',
        series: this.computeFFT(original, this.fs)
      },
      {
        name: `Downsampled ×${this.downsampleFactor}`,
        series: this.computeFFT(down, this.fs / this.downsampleFactor)
      }
    ];
  }

  /* ================= FFT ================= */

  computeFFT(signal: number[], fs: number) {
    const N = signal.length;
    const result: { name: number; value: number }[] = [];

    for (let k = 0; k < N / 2; k++) {
      let re = 0;
      let im = 0;

      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        re += signal[n] * Math.cos(angle);
        im -= signal[n] * Math.sin(angle);
      }

      const mag = Math.sqrt(re * re + im * im) / N;
      result.push({ name: (k * fs) / N, value: 20 * Math.log10(mag + 1e-6) });
    }

    return result;
  }
}
