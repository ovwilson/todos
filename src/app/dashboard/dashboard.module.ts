import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { APPRROUTES } from "./dashboard.routing";

@NgModule({
  imports: [
    RouterModule.forChild(APPRROUTES)
  ],
  declarations :[
    DashboardComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule {}