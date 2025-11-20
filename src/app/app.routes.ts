import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Landingpage } from './pages/landingpage/landingpage';
import { Chapter1 } from './components/chapter1/chapter1';
import { Chapter2 } from './components/chapter2/chapter2';
import { Chapter3 } from './components/chapter3/chapter3';
import { Chapter4 } from './components/chapter4/chapter4';
import { Chapter8 } from './components/chapter8/chapter8';
import { Chapter12 } from './components/chapter12/chapter12';
import { Chapter11 } from './components/chapter11/chapter11';
import { Chapter10 } from './components/chapter10/chapter10';
import { Chapter7 } from './components/chapter7/chapter7';
import { Chapter5 } from './components/chapter5/chapter5';
import { Chapter6 } from './components/chapter6/chapter6';
import { Chapter9 } from './components/chapter9/chapter9';


export const routes: Routes = [
    { path: '', component: Landingpage },   // Default route
    {
        path: 'main',
        component: Main,
        children: [
            { path: '', redirectTo: 'chapter1', pathMatch: 'full' },
            { path: 'chapter1', component: Chapter1 },
            { path: 'chapter2', component: Chapter2 },
            { path: 'chapter3', component: Chapter3 },
            { path: 'chapter4', component: Chapter4 },
            { path: 'chapter5', component: Chapter5 },
            { path: 'chapter6', component: Chapter6 },
            { path: 'chapter7', component: Chapter7 },
            { path: 'chapter8', component: Chapter8 },
            { path: 'chapter9', component: Chapter9 },
            { path: 'chapter10', component: Chapter10 },
            { path: 'chapter11', component: Chapter11 },
            { path: 'chapter12', component: Chapter12 },

        ],
    }
];

