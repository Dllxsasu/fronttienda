import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCheckboxModule, NbLayoutModule, NbSelectModule, NbSpinnerModule, NbTreeGridComponent, NbTreeGridModule } from '@nebular/theme';

@NgModule({
  declarations: [
    
  ],
  imports: [
    NbSpinnerModule,
    NbCheckboxModule,
    NbTreeGridModule,
    NbLayoutModule,
    NbSelectModule
  ],
  exports:[
    NbSpinnerModule,
    NbCheckboxModule,
    NbTreeGridComponent, 
    NbTreeGridModule,
    NbLayoutModule,
    NbSelectModule
  ]
})
export class NebulaModule { }
