
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-id8',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './id8.html',
  styleUrls: ['./id8.css'],
})
export class Id8 implements AfterViewInit, OnDestroy {
  @ViewChild('canvas1') canvas1Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2Ref!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3') canvas3Ref!: ElementRef<HTMLCanvasElement>;

  activeTab: 'DESIGN' | 'NOBLE' | 'POLYPHASE' = 'DESIGN';
  private resizeObserver!: ResizeObserver;

  // ... [Keep your existing params: designParams, nobleParams, polyParams etc.] ...
  // (Paste the state variables from your original code here: designParams, nobleParams, polyParams, designMetrics, nobleStatus, polyMetrics)
  
  // --- TAB 1: DESIGN ---
  designParams = { N: 32, cutoff: 0.1, window: 'hamming' };
  designMetrics = { isLinearPhase: true };

  // --- TAB 2: NOBLE ---
  nobleParams = { M: 2, sigType: 'Step' };
  nobleStatus = { verified: false };

  // --- TAB 3: POLYPHASE ---
  polyParams = { M: 4, N: 32 };
  polyMetrics = { directOps: 0, polyOps: 0, speedup: 0 };

  private ctx1!: CanvasRenderingContext2D;
  private ctx2!: CanvasRenderingContext2D;
  private ctx3!: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(() => {
      this.initCanvases();
      this.render();
    });

    // Observer parent of canvas-wrap to handle resizing
    if (this.canvas1Ref) this.resizeObserver.observe(this.canvas1Ref.nativeElement.parentElement!);
  }

  ngOnDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  setTab(t: 'DESIGN' | 'NOBLE' | 'POLYPHASE') {
    this.activeTab = t;
    setTimeout(() => {
      this.initCanvases();
      this.render();
    }, 0);
  }

  private initCanvases() {
    this.initSingle(this.canvas1Ref, (c) => (this.ctx1 = c));
    this.initSingle(this.canvas2Ref, (c) => (this.ctx2 = c));
    this.initSingle(this.canvas3Ref, (c) => (this.ctx3 = c));
  }

  private initSingle(
    ref: ElementRef,
    cb: (c: CanvasRenderingContext2D) => void
  ) {
    if (!ref) return;
    const cvs = ref.nativeElement;
    const parent = cvs.parentElement;
    if (!parent || parent.clientWidth === 0) return;
    
    const dpr = window.devicePixelRatio || 1;
    cvs.width = parent.clientWidth * dpr;
    cvs.height = parent.clientHeight * dpr;
    
    const ctx = cvs.getContext('2d')!;
    ctx.scale(dpr, dpr);
    cb(ctx);
  }

  render() {
    if (this.activeTab === 'DESIGN') this.renderDesign();
    else if (this.activeTab === 'NOBLE') this.renderNoble();
    else if (this.activeTab === 'POLYPHASE') this.renderPolyphase();
  }

  // ... [Keep your existing renderDesign, renderNoble, renderPolyphase and DSP helpers] ...
  // (Copy all the render methods and helper functions from your provided code exactly as they were)
  
  // --- COPY-PASTE DSP LOGIC BELOW HERE (renderDesign, renderNoble, etc.) ---
  
  // [Example of one function to ensure context is clear]
  renderDesign() {
    if (!this.ctx1) return;
    const w = this.ctx1.canvas.width / (window.devicePixelRatio || 1);
    const h = this.ctx1.canvas.height / (window.devicePixelRatio || 1);
    this.clearCtx(this.ctx1, w, h);

    const N = this.designParams.N;
    const fc = this.designParams.cutoff;

    const h_imp = this.firDesign(N, fc);
    
    // ... [Rest of logic] ...
    
    // Plot logic remains identical, just ensure drawStem etc are available
    // Note on Colors: Since background is black (CRT), ensure text/lines are light
    
    // Freq Response
    const fftN = 1024;
    const padH = [...h_imp, ...new Array(fftN - N).fill(0)];
    const fftRes = this.fft(padH);
    const magDb = fftRes.mag.slice(0, fftN / 2).map((m) => 20 * Math.log10(m + 1e-12));
    const freqAxis = this.linspace(0, 0.5, fftN / 2);
    
    this.designMetrics.isLinearPhase = this.checkSymmetry(h_imp);

    const h1 = h * 0.55;
    
    // Pass 'true' or specific color for CRT look
    this.drawBg(this.ctx1, w, h1, 'Frequency Response (dB)', 0);
    this.drawPlot(this.ctx1, freqAxis, magDb, 0, h1, w, '#00e5ff', [-80, 5]);

    this.drawStem(
      this.ctx1,
      h_imp,
      '#facc15', // Yellow for Impulse
      h1 + 10,
      h - h1 - 10,
      w,
      `Impulse Response (N=${N})`
    );
  }
  
  // [Helper stubs to ensure compilation if you copy-paste]
  private clearCtx(ctx: CanvasRenderingContext2D, w: number, h: number) {
      ctx.fillStyle = '#000'; // CRT Black
      ctx.fillRect(0, 0, w, h);
  }
  
  private drawBg(ctx: CanvasRenderingContext2D, w: number, h: number, title: string, top: number) {
      ctx.strokeStyle = '#333';
      ctx.strokeRect(10, top + 10, w - 20, h - 20);
      ctx.fillStyle = '#888';
      ctx.font = '12px monospace';
      ctx.fillText(title, 20, top + 25);
  }
  
  // ... [Include remaining helpers: drawPlot, drawStem, firDesign, fft, etc.] ...
  // [Use the implementation from your original code]
  
  // Quick Fix for drawPlot/drawStem colors:
  // In your original code, you might have used dark lines for white bg. 
  // Ensure you switch to bright colors (Cyan, Yellow, Green) for the black background.
  
  private drawPlot(ctx: CanvasRenderingContext2D, x: number[], y: number[], top: number, h: number, w: number, col: string, yRange: number[]) {
     // ... implementation adapted for black background ...
     const min = yRange[0], max = yRange[1];
     const scX = (w - 100) / (x[x.length - 1] - x[0]);
     const scY = (h - 60) / (max - min);
     
     ctx.beginPath();
     ctx.strokeStyle = col;
     ctx.lineWidth = 2;
     for (let i = 0; i < x.length; i++) {
        const px = 50 + (x[i] - x[0]) * scX;
        const py = top + h - 30 - (y[i] - min) * scY;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
     }
     ctx.stroke();
  }

  private drawStem(ctx: CanvasRenderingContext2D, data: number[], col: string, top: number, h: number, w: number, lbl: string) {
     this.drawBg(ctx, w, h, lbl, top);
     const mid = top + h / 2;
     const scX = (w - 100) / data.length;
     const maxVal = Math.max(...data.map(Math.abs)) || 1;
     const scY = (h / 2 - 40) / maxVal;
     
     ctx.strokeStyle = '#333'; // Zero line
     ctx.beginPath(); ctx.moveTo(50, mid); ctx.lineTo(w-50, mid); ctx.stroke();

     ctx.strokeStyle = col;
     ctx.fillStyle = col;
     for(let i=0; i<data.length; i++) {
        const x = 50 + i * scX;
        const y = mid - data[i] * scY;
        ctx.beginPath(); ctx.moveTo(x, mid); ctx.lineTo(x, y); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 2, 0, 6.28); ctx.fill();
     }
  }
  
  // DSP Math
  private firDesign(N: number, fc: number): number[] { const h = []; const c = (N-1)/2; for(let n=0; n<N; n++){ const k=n-c; const v = k===0?2*fc:Math.sin(2*Math.PI*fc*k)/(Math.PI*k); const w = 0.54-0.46*Math.cos(2*Math.PI*n/(N-1)); h.push(v*w); } return h; }
  private fft(sig: number[]) { const n = sig.length; const r = new Float64Array(n); for(let i=0; i<n; i++) r[i]=sig[i]; const im = new Float64Array(n); this.transform(r, im); const mag=[]; for(let i=0; i<n; i++) mag.push(Math.sqrt(r[i]**2 + im[i]**2)); return {mag}; }
  private transform(real: Float64Array, imag: Float64Array) { /* ... keep existing FFT logic ... */ 
    const n = real.length; if (n <= 1) return; let j = 0; for (let i = 0; i < n; i++) { if (i < j) { [real[i], real[j]] = [real[j], real[i]]; [imag[i], imag[j]] = [imag[j], imag[i]]; } let m = n >> 1; while (j >= m && m > 0) { j -= m; m >>= 1; } j += m; } for (let len = 2; len <= n; len <<= 1) { const ang = (-2 * Math.PI) / len; const wlen_r = Math.cos(ang); const wlen_i = Math.sin(ang); for (let i = 0; i < n; i += len) { let w_r = 1; let w_i = 0; for (let k = 0; k < len / 2; k++) { const u_r = real[i + k]; const u_i = imag[i + k]; const v_r = real[i + k + len / 2] * w_r - imag[i + k + len / 2] * w_i; const v_i = real[i + k + len / 2] * w_i + imag[i + k + len / 2] * w_r; real[i + k] = u_r + v_r; imag[i + k] = u_i + v_i; real[i + k + len / 2] = u_r - v_r; imag[i + k + len / 2] = u_i - v_i; const temp_r = w_r; w_r = w_r * wlen_r - w_i * wlen_i; w_i = temp_r * wlen_i + w_i * wlen_r; } } }
  }
  private checkSymmetry(h: number[]) { const len = h.length; for(let i=0; i<len/2; i++) if(Math.abs(h[i]-h[len-1-i]) > 1e-5) return false; return true; }
  private linspace(s: number, e: number, n: number) { const step = (e-s)/(n-1); return Array.from({length:n}, (_,i)=>s+i*step); }
  private convolve(u: number[], v: number[]): number[] { const n = u.length, m = v.length; const res = new Array(n + m - 1).fill(0); for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) res[i + j] += u[i] * v[j]; return res; }

  renderPolyphase() {
    if (!this.ctx3) return;
    const w = this.ctx3.canvas.width / (window.devicePixelRatio || 1);
    const h = this.ctx3.canvas.height / (window.devicePixelRatio || 1);
    this.clearCtx(this.ctx3, w, h);

    const M = this.polyParams.M;
    const N = this.polyParams.N;
    const h_poly = Array.from({ length: N }, (_, i) => i + 1);

    const plotH = h * 0.7;
    this.drawBg(this.ctx3, w, plotH, `Polyphase Decomposition: ${M} branches`, 0);

    const offX = 60;
    const scaleX = (w - 120) / N;
    const scaleY = (plotH - 80) / Math.max(...h_poly);
    const midY = plotH - 40;

    this.ctx3.fillStyle = '#e2e8f0';
    for (let i = 0; i < N; i++) {
      const x = offX + i * scaleX;
      const y = midY - h_poly[i] * scaleY;
      this.ctx3.beginPath();
      this.ctx3.arc(x, y, 3, 0, 2 * Math.PI);
      this.ctx3.fill();
    }

    const colors = ['#dc2626', '#2563eb', '#16a34a', '#d97706'];
    const phasesToShow = Math.min(M, 4);

    for (let p = 0; p < phasesToShow; p++) {
      const col = colors[p % colors.length];
      this.ctx3.strokeStyle = col;
      this.ctx3.fillStyle = col;
      
      this.ctx3.beginPath();
      for (let i = p; i < N; i += M) {
        const x = offX + i * scaleX;
        const y = midY - h_poly[i] * scaleY;
        this.ctx3.moveTo(x, midY);
        this.ctx3.lineTo(x, y);
      }
      this.ctx3.stroke();

      for (let i = p; i < N; i += M) {
        const x = offX + i * scaleX;
        const y = midY - h_poly[i] * scaleY;
        this.ctx3.beginPath();
        this.ctx3.arc(x, y, 4, 0, 2 * Math.PI);
        this.ctx3.fill();
      }
    }

    const legendY = plotH + 20;
    this.ctx3.font = '12px Segoe UI';
    for (let p = 0; p < phasesToShow; p++) {
      this.ctx3.fillStyle = colors[p];
      this.ctx3.fillText(`Phase ${p}`, 60 + p * 100, legendY);
    }

    const L_sig = 10000;
    this.polyMetrics = {
      directOps: L_sig * N,
      polyOps: (L_sig * N) / M,
      speedup: M,
    };
  }

  renderNoble() {
    if (!this.ctx2) return;
    const w = this.ctx2.canvas.width / (window.devicePixelRatio || 1);
    const h = this.ctx2.canvas.height / (window.devicePixelRatio || 1);
    this.clearCtx(this.ctx2, w, h);

    const M = this.nobleParams.M;
    const h_filt = [1, 2, 3, 2, 1];
    const L = 20;

    let x: number[] = [];
    if (this.nobleParams.sigType === 'Step') x = new Array(L).fill(1);
    else if (this.nobleParams.sigType === 'Ramp') x = Array.from({ length: L }, (_, i) => i);
    else x = Array.from({ length: L }, () => Math.floor(Math.random() * 10));

    const x_down = x.filter((_, i) => i % M === 0);
    const y_left = this.convolve(x_down, h_filt);

    const h_up = new Array(h_filt.length * M - (M - 1)).fill(0);
    for (let i = 0; i < h_filt.length; i++) h_up[i * M] = h_filt[i];

    const y_temp = this.convolve(x, h_up);
    const y_right = y_temp.filter((_, i) => i % M === 0);

    const len = Math.min(y_left.length, y_right.length);
    let match = true;
    for (let i = 0; i < len; i++) {
      if (Math.abs(y_left[i] - y_right[i]) > 1e-5) match = false;
    }
    this.nobleStatus.verified = match;

    const rowH = h / 3;
    this.drawStem(this.ctx2, x, '#64748b', 0, rowH, w, '1. Input Signal x[n]');
    this.drawStem(this.ctx2, y_left, '#2563eb', rowH, rowH, w, `2. Left: Down(${M}) → Filter`);
    this.drawStem(this.ctx2, y_right, '#dc2626', rowH * 2, rowH, w, `3. Right: Filter → Down(${M})`);
  }
}
