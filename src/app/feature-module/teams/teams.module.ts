import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamsContentComponent } from './teams-content/teams-content.component';


@NgModule({
  declarations: [
 
    TeamsComponent,
    TeamsContentComponent
    
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TeamsRoutingModule,
  
   
   
    
    
    
  ]
})
export class TeamsModule { }
