import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesComponent } from './taches.component';
import { TachesContentComponent } from './taches-content/taches-content.component';



const routes: Routes = [
    {
        path: '',
        component: TachesComponent,
        children: [
            { path: "taches-content", component: TachesContentComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TachesRoutingModule { }