import {  Component,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MathJaxDirective } from '../../../components/mathjax.directive';



@Component({
  selector: 'app-subtopic127',
 imports: [MatCardModule ,CommonModule  , MatButtonModule, MathJaxDirective ],
  templateUrl: './subtopic127.html',
  styleUrl: './subtopic127.css',
     schemas: [CUSTOM_ELEMENTS_SCHEMA] 

})
export class Subtopic127 {

}
