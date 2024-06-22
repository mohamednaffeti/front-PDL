import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';
import { DocumentPageComponent } from './document-page/document-page.component';
import { DocRequestComponent } from './doc-request/doc-request.component';


const routes: Routes = [
    {
        path: '',
        component: DocumentsComponent,
        children: [
            { path: "document-page", component: DocumentPageComponent },
            { path: "request-page", component: DocRequestComponent },
           
          ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule { }
