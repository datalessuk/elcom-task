import { Routes } from '@angular/router';
import { Task } from './task/task';

export const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: Task },
];
