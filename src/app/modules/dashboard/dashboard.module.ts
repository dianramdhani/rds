import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MapComponent } from './component/map/map.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TripsComponent } from './component/trips/trips.component';


@NgModule({
  declarations: [MapComponent, DashboardComponent, TripsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
