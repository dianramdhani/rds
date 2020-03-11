import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MapGraphComponent } from './page/map-graph/map-graph.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: ':surveySummaryId', component: MapGraphComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
