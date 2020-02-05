import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableTableModule } from 'src/reusable-table/reusable-table.module';
import { ApiService } from './api.service';
import { MainRoutingModule } from './main-routing-module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ReusableTableModule,
    MainRoutingModule,
    HttpClientModule
  ],
  providers:[ApiService]
})
export class MainModule { }
