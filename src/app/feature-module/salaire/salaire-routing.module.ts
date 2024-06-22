import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaireComponent } from './salaire.component';
import { AddRequestSalaryComponent } from './add-request-salary/add-request-salary.component';
import { GetAllRequestSalaryComponent } from './get-all-request-salary/get-all-request-salary.component';
import { AllSalaireComponent } from './all-salaire/all-salaire.component';


const routes: Routes = [
  {
    path: '',
    component: SalaireComponent,
    children: [
      { path: "salaire-page", component: AddRequestSalaryComponent },
      { path: "demande-page", component: GetAllRequestSalaryComponent },
      { path: "all-salaire", component: AllSalaireComponent },
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SalaireRoutingModule { }
