import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports: [
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
