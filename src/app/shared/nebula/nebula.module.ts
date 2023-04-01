import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCheckboxModule, NbLayoutModule, NbSpinnerModule, NbTreeGridComponent, NbTreeGridModule } from '@nebular/theme';

@NgModule({
  declarations: [
    
  ],
  imports: [
    NbSpinnerModule,
    NbCheckboxModule,
    NbTreeGridModule,
    NbLayoutModule
  ],
  exports:[
    NbSpinnerModule,
    NbCheckboxModule,
    NbTreeGridComponent, 
    NbTreeGridModule,
    NbLayoutModule
  ]
})
export class NebulaModule { }
