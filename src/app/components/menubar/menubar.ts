import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';

interface MenuNode {
  icon: string;
  label: string;
  route: string;
  children?: MenuNode[];
}



// Menu items available for sidenav, why? easily editable code for buttons on sidebar
const menuItems: MenuNode[] = [
  {
    icon: 'keyboard_double_arrow_right', // Icon for the 'Home' menu item. where to get? Material Icon just google it and there are plenty of icons
    label: '1. Introduction ',     // Label for the 'Home' menu item
    route: 'chapter1',     // Route to navigate to when 'Home' is clicked
    children: [
      {
        icon: 'science',
        label: 'Lab ',
        route: 'chapter1/lab1'
      }

    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '2. Quantization Signal to Noise Ratio (SNR)',
    route: 'chapter2', // Route to navigate to when 'Analytics' is clicked
    children: [
      {
        icon: 'topic',
        label: '2.1 Calculating the SNR ',
        route: 'chapter2/subtopic1'
      },
      {
        icon: 'topic',
        label: '2.2  Non-full Range Signals ',
        route: 'chapter2/subtopic2'
      },
      {
        icon: 'topic',
        label: '2.3 Non-uniformly Distributed Signals ',
        route: 'chapter2/subtopic1.3'
      },
      {
        icon: 'science',
        label: 'Lab ',
        route: 'chapter2/lab2'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '3. SNR and Non-uniform Quantization',
    route: 'chapter3',
    children: [
      {
        icon: 'topic',
        label: '3.1 SNR with Sinusoidal Signals ',
        route: 'chapter3/subtopic31'
      },
      {
        icon: 'topic',
        label: '3.2 Companding',
        route: 'chapter3/subtopic32'
      },
      {
        icon: 'science',
        label: 'Lab',
        route: 'chapter3/lab3'
      },
    ]
  },

  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '4. Lloyd-Max Quantizer ',
    route: 'chapter4'
    ,
    children: [
      {
        icon: '',
        label: 'Examples of Uniform PDFs ',
        route: 'chapter2/definition'
      },
      {
        icon: '',
        label: ' Calculating the SNR ',
        route: 'chapter2/error'
      },
    ]
  },

  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: ' 5. Vector Quantization, LBG',
    route: 'chapter5'
    ,
    children: [
      {
        icon: '',
        label: 'Examples of Uniform PDFs ',
        route: 'chapter2/definition'
      },
      {
        icon: '',
        label: ' Calculating the SNR ',
        route: 'chapter2/error'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '6. Sampling: Downsampling, Upsampling',
    route: 'chapter6'
    ,
    children: [
      {
        icon: '',
        label: 'Examples of Uniform PDFs ',
        route: 'chapter2/definition'
      },
      {
        icon: '',
        label: ' Calculating the SNR ',
        route: 'chapter2/error'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '7. z-Transform, Filters',
    route: 'chapter7'
    ,
    children: [
      {
        icon: 'topic',
        label: '7.1 The z-Transform ',
        route: 'chapter7/subtopic71'
      },
      {
        icon: 'topic',
        label: '7.2 Filters',
        route: 'chapter7/subtopic72'
      },
      {
        icon: 'science',
        label: ' Lab ',
        route: 'chapter7/lab7'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '8. Filters, Noble Identities',
    route: 'chapter8'
    ,
    children: [
      {
        icon: 'topic',
        label: '8.1 Filter Design  ',
        route: 'chapter8/subtopic81'
      },
      {
        icon: 'topic',
        label: ' 8.2 Filtering and Sampling, Multirate Noble Identities ',
        route: 'chapter8/subtopic82'
      },
      {
        icon: 'topic',
        label: ' 8.3 Polyphase Representation  ',
        route: 'chapter8/subtopic83'
      },
      {
        icon: 'science',
        label: ' Lab ',
        route: 'chapter8/lab8'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '9. Allpass Filters, Warping',
    route: 'chapter9'
    ,
    children: [

      {
        icon: 'science',
        label: ' Lab',
        route: 'chapter9/lab9'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '10. Minimum Phase Filters',
    route: 'chapter10'
    ,
    children: [
      {
        icon: 'topic',
        label: '10.1 Introduction ',
        route: 'chapter10/subtopic101'
      },
        {
        icon: 'topic',
        label: '10.2 Summary of Minimum Phase Filters ',
        route: 'chapter10/subtopic102'
      },
        {
        icon: 'topic',
        label: '10.3 Homework Problems ',
        route: 'chapter10/subtopic103'
      },
      {
        icon: 'science',
        label: ' Lab',
        route: 'chapter10/lab10'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '11. Hilbert Transform',
    route: 'chapter11'
    ,
    children: [
      {
        icon: '',
        label: 'Examples of Uniform PDFs ',
        route: 'chapter2/definition'
      },
       {
        icon: 'science',
        label: ' Lab',
        route: 'chapter11/lab11'
      },
    ]
  },
  {
    icon: 'keyboard_double_arrow_right',      // Icon for the 'Analytics' menu item
    label: '12. Wiener & Matched Filters',
    route: 'chapter12'
    ,
    children: [
      {
        icon: '',
        label: 'Examples of Uniform PDFs ',
        route: 'chapter2/definition'
      },
       {
        icon: 'science',
        label: ' Lab',
        route: 'chapter12/lab12'
      },
    ]
  },
  {
    icon: 'book_2',      // Icon for the 'Analytics' menu item
    label: '13. Bibliography',
    route: 'bibliography',
   

  },

];


@Component({
  selector: 'app-menubar',
  imports: [
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule, MatTreeModule,
    // Angular Material modules
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,

  ],
  templateUrl: './menubar.html',
  styleUrl: './menubar.css'
})
export class Menubar {


  isMobile = false;
  badgevisible = false;

  dataSource = menuItems;

  childrenAccessor = (node: MenuNode) => node.children ?? [];
  hasChild = (_: number, node: MenuNode) =>
    !!node.children && node.children.length > 0;

  /* ✅ CONSTRUCTOR — INSIDE CLASS */
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    // Listen to route changes and scroll to top
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }



  /* ✅ LIFECYCLE HOOK */
  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  badgevisibility() {
    this.badgevisible = !this.badgevisible;
  }


}