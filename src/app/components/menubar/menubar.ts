import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-menubar',
  imports: [
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
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

   // Menu items available for sidenav, why? easily editable code for buttons on sidebar
  menuItems = [
    {
      icon: 'book_2', // Icon for the 'Home' menu item. where to get? Material Icon just google it and there are plenty of icons
      label: 'Introduction ',     // Label for the 'Home' menu item
      route: 'chapter1'      // Route to navigate to when 'Home' is clicked
    },
     {
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Quantization Signal to Noise Ratio (SNR)',// Label for the 'Analytics' menu item
      route: 'chapter2' // Route to navigate to when 'Analytics' is clicked
    },
     {
      icon: 'book_2',      // Icon for the 'Analytics' menu item
      label: 'SNR and Non-uniform Quantization',// Label for the 'Analytics' menu item
      route: 'chapter3' // Route to navigate to when 'Analytics' is clicked
    },
    
     {
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Lloyd-Max Quantizer ',// Label for the 'Analytics' menu item
      route: 'chapter4' // Route to navigate to when 'Analytics' is clicked
    },

       {
      icon: 'book_2',      // Icon for the 'Analytics' menu item
      label: ' Vector Quantization, LBG',// Label for the 'Analytics' menu item
      route: 'chapter5' // Route to navigate to when 'Analytics' is clicked
    },
{
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Sampling: Downsampling, Upsampling',// Label for the 'Analytics' menu item
      route: 'chapter6' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'book_2',      // Icon for the 'Analytics' menu item
      label: ' z-Transform, Filters',// Label for the 'Analytics' menu item
      route: 'chapter7' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Filters, Noble Identities',// Label for the 'Analytics' menu item
      route: 'chapter8' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'book_2',      // Icon for the 'Analytics' menu item
      label: 'Allpass Filters, Warping',// Label for the 'Analytics' menu item
      route: 'chapter9' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Minimum Phase Filters',// Label for the 'Analytics' menu item
      route: 'chapter10' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'book_2',      // Icon for the 'Analytics' menu item
      label: 'Hilbert Transform',// Label for the 'Analytics' menu item
      route: 'chapter11' // Route to navigate to when 'Analytics' is clicked
    },
    {
      icon: 'description',      // Icon for the 'Analytics' menu item
      label: 'Wiener & Matched Filters',// Label for the 'Analytics' menu item
      route: 'chapter12' // Route to navigate to when 'Analytics' is clicked
    },
 
  ]; 


  badgevisible = false;

  badgevisibility() {
    this.badgevisible = !this.badgevisible;
  }
 constructor(
    private breakpointObserver: BreakpointObserver,


    // injected to manage login, logout, and token operations
    private router: Router,                 // injected to navigate between routes (e.g., redirect to login or dashboard)
    private snackBar: MatSnackBar           // injected to display user friendly confirmation messages (e.g., success or error notifications) during logged in or logged out
  ) { }
  

    ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

 
}