import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsencesComponent } from './absences.component';
import { AbsencesContentComponent } from './absences-content/absences-content.component';
import { RequestAbsenceComponent } from './request-absence/request-absence.component';


const routes: Routes = [
  { 
    path: '', 
    component: AbsencesComponent,
    children: [
        { path: "absences-page", component: AbsencesContentComponent },
        { path: "request-page", component: RequestAbsenceComponent },
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsencesRoutingModule { }