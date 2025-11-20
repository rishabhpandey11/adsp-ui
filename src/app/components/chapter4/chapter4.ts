import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapter4',
  imports: [MatCardModule, FormsModule, CommonModule, MatCardModule, MatRadioModule, MatButtonModule,],
  templateUrl: './chapter4.html',
  styleUrl: './chapter4.css',
})
export class Chapter4 {

}
