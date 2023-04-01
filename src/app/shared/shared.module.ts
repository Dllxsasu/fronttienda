import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NebulaModule } from './nebula/nebula.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    NebulaModule
  ],exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    NebulaModule
  ]
})
export class SharedModule { }
