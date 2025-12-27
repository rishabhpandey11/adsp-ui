
import {  Component,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MathJaxDirective } from '../../../components/mathjax.directive';




@Component({
  selector: 'app-subtopic81',
 imports: [MatCardModule ,CommonModule ,MathJaxDirective , MatButtonModule ],
  templateUrl: './subtopic81.html',
  styleUrl: './subtopic81.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class Subtopic81 {

}
