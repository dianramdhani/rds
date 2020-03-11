import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SurveysComponent } from './component/surveys/surveys.component';
import { GraphComponent } from './component/graph/graph.component';
import { MapGraphCommunicatorService } from '@shared/service/map-graph-communicator.service';
import { SharedModule } from '@shared/shared.module';
import { MapGraphComponent } from './page/map-graph/map-graph.component';


@NgModule({
  declarations: [MapComponent, DashboardComponent, SurveysComponent, GraphComponent, MapGraphComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
    MapGraphCommunicatorService
  ]
})
export class DashboardModule { }
