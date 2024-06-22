import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentsRoutingModule } from './document-routing.module';
import { DocumentsComponent } from './documents.component';
import { DocumentPageComponent } from './document-page/document-page.component';
import { DocRequestComponent } from './doc-request/doc-request.component';




@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentPageComponent,
    DocRequestComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
