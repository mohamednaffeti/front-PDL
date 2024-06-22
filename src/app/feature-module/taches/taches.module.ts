import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TachesContentComponent } from './taches-content/taches-content.component';
import { TachesComponent } from './taches.component';
import { TachesRoutingModule } from './taches-routing.module';



@NgModule({
  declarations: [
 
    
    TachesComponent,
    TachesContentComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TachesRoutingModule,
  ]
})
export class TachesModule { }