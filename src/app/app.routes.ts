import { Routes } from '@angular/router';
import { Task } from './task/task';
import { NoPageComponent } from './no-page/no-page';

export const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: Task },
  { path: '**', component: NoPageComponent },
];
