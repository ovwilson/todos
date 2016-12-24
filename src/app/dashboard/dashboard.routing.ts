import { Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";

export const APPRROUTES: Routes = [
  { path: '/', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: DashboardComponent }
];
