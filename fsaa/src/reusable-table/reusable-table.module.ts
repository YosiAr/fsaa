import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { SlicePipe } from './slice.pipe';

@NgModule({
  declarations: [TableComponent, SlicePipe],
  imports: [
    CommonModule
  ],
  exports: [TableComponent]
})
export class ReusableTableModule { }
