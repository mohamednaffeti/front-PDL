import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalaireComponent } from './salaire.component';
import { SalaireRoutingModule } from './salaire-routing.module';
import { AddRequestSalaryComponent } from './add-request-salary/add-request-salary.component';
import { GetAllRequestSalaryComponent } from './get-all-request-salary/get-all-request-salary.component';
import { AllSalaireComponent } from './all-salaire/all-salaire.component';



@NgModule({
  declarations: [
    SalaireComponent,
    AddRequestSalaryComponent,
    GetAllRequestSalaryComponent,
    AllSalaireComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SalaireRoutingModule
  ]
})
export class SalaireModule { }
