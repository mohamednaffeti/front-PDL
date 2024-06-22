

import { Component, OnInit, ViewChild } from '@angular/core';
import { DocService } from 'src/app/services/documentService/document.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

class Doc {
  title: any
  documentType: any
  status: any
}
@Component({
  selector: 'app-doc-request',
  templateUrl: './doc-request.component.html',
  styleUrls: ['./doc-request.component.scss']
})
export class DocRequestComponent implements OnInit {
  types: any
  doc = new Doc()
  me: any
  allDocument: any = []
  @ViewChild('closeButton') closeButton: any
  constructor(private documentService: DocService, private userService: UserService) {
    this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
      console.log('me', res)
      this.me = res
      // this.userService

    })
    this.getType()
  }
  ngOnInit(): void {
    this.getAllDoc()
  }

  getAllDoc() {
    this.documentService.getDocument().subscribe(res => {
      console.log(res);
      this.allDocument = res
      if(this.me.roles[0].id == 2 ){
        this.allDocument = this.allDocument.filter((i: any) => {
          return i.status == 'IN_PROGRESS' && i.user?.team?.id == this.me.team?.id
        })
      }

      if(this.me.roles[0].id == 3 ){
        this.allDocument = this.allDocument.filter((i: any) => {
          return i.status == 'IN_PROGRESS' && i.user?.id == this.me.id
        })
      }
   

    })
  }

  deleteResquet(d: any) {

  }

  Accept(data:any , status :any, idUser:any){
  var obj = {
    id : data.id,
    title : data.title , 
    documentType : data.documentType,
    status : status
  }
  this.documentService.editDocument(obj , idUser).subscribe(res=>{
  
    Swal.fire(
      'Good job!',
      'You chnaged a status!',
      'success'
    ).then(() => {
     
      // this.getCurrentUser()
      window.location.reload()
    })
  })
  }



  getType() {
    this.documentService.getEnumDocument().subscribe(res => {
      this.types = res
    })
  }
  addSalary() {
    this.doc.status = false

    this.documentService.addDocument(this.doc, this.me.id).subscribe(res => {
      console.log(res);
      Swal.fire(
        'Good job!',
        'You added a request!',
        'success'
      ).then(() => {
        this.closeButton.nativeElement.click()
        // this.getCurrentUser()
        this.doc = new Doc()
      })
    })

  }
}
