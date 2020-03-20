import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports: [
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgbModule
  ]
})
export class SharedModule { }
