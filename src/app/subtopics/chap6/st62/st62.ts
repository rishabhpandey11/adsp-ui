import {  Component ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-st62',
  imports: [MatCardModule ,CommonModule  , MatButtonModule ],
  templateUrl: './st62.html',
  styleUrl: './st62.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class St62 {

}
