import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbsencesComponent } from './absences.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { AbsencesContentComponent } from './absences-content/absences-content.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { RequestAbsenceComponent } from './request-absence/request-absence.component';

@NgModule({
  declarations: [
    AbsencesComponent,
    AbsencesContentComponent,
    RequestAbsenceComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AbsencesRoutingModule,
    FullCalendarModule,
    
  ], providers: [
     DatePipe

]
})
export class AbsencesModule { }
