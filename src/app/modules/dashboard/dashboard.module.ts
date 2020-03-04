import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SurveysComponent } from './component/surveys/surveys.component';
import { GraphComponent } from './component/graph/graph.component';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';


@NgModule({
  declarations: [MapComponent, DashboardComponent, SurveysComponent, GraphComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    MapGraphCommunicatorService
  ]
})
export class DashboardModule { }
