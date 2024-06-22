import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamsContentComponent } from './teams-content/teams-content.component';


const routes: Routes = [
  { 
    path: '', 
    component: TeamsComponent,
    children: [
      { path: "teams-content", component: TeamsContentComponent },
     
    ]
   }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }