
import { ChangeDetectionStrategy, Component , signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';  
import { MathJaxDirective } from '../mathjax.directive';




@Component({
  selector: 'app-chapter9',
  imports: [MatCardModule, FormsModule, MathJaxDirective, MatCardModule, MatRadioModule, MatButtonModule],
  templateUrl: './chapter9.html',
  styleUrl: './chapter9.css',
})
export class Chapter9 {
questions = [
  {
    text: '1️⃣ What is the key property of an allpass filter?',
    options: [
      'It keeps phase constant across frequencies',
      'It has zero phase distortion',
      'Its magnitude response is constant for all frequencies ',
      'It amplifies low frequencies only'
    ],
    correctAnswer: 'Its magnitude response is constant for all frequencies ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 Allpass filters modify only **phase**, not magnitude.'
  },
  {
    text: '2️⃣ In a simple IIR allpass filter, where are the pole and zero located?',
    options: [
      'Both at the same point on the unit circle',
      'At conjugate and reverse reciprocal locations ',
      'Both inside the unit circle',
      'Both outside the unit circle'
    ],
    correctAnswer: 'At conjugate and reverse reciprocal locations ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 The zero is the **inverted, conjugated** version of the pole.'
  },
  {
    text: '3️⃣ Why can an allpass filter be used for fractional delay?',
    options: [
      'Because it boosts magnitude at low frequencies',
      'Because its phase response can approximate a desired delay ',
      'Because it eliminates aliasing',
      'Because it is linear phase by design'
    ],
    correctAnswer: 'Because its phase response can approximate a desired delay ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 Fractional delay is achieved using a **phase-only modification**.'
  },
  {
    text: '4️⃣ What effect does an allpass-based warping function have on frequency?',
    options: [
      'Compresses high frequencies and expands low frequencies ',
      'Compresses low frequencies and expands high frequencies',
      'Increases overall magnitude of the spectrum',
      'Makes frequency response flat'
    ],
    correctAnswer: 'Compresses high frequencies and expands low frequencies ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 Allpass warping is commonly used in perceptual audio processing.'
  },
  {
    text: '5️⃣ What is notable about using allpass filters for frequency warping?',
    options: [
      'Warped FIR filters remain FIR',
      'Warped FIR filters become IIR filters ',
      'It increases computational complexity without benefit',
      'It forces the filter to become linear phase'
    ],
    correctAnswer: 'Warped FIR filters become IIR filters ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 Even an FIR filter becomes IIR after warping due to recursion.'
  },
  {
    text: '6️⃣ Which psychoacoustic scale is approximated using allpass warping?',
    options: [
      'Mel scale',
      'ERB scale',
      'Bark scale ',
      'Fourier scale'
    ],
    correctAnswer: 'Bark scale ',
    selectedAnswer: null,
    isSubmitted: false,
    tip: '💡 Allpass frequency warping is used to approximate the Bark scale in hearing models.'
  }
];


  submitAnswer(question: any) {
    question.isSubmitted = true;
  }


  tryAgain(question: any) {
    question.isSubmitted = false;
    question.selectedAnswer = null;
  }

}
