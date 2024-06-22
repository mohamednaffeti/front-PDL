import { Component, OnInit, ViewChild } from '@angular/core';
import { DocService } from 'src/app/services/documentService/document.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
class Doc {
  title : any
  documentType : any
  status : any
}
@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent implements OnInit {
  types : any
  doc = new Doc()
  dataDoc : any 
  me : any
  allDocument : any = []
  @ViewChild('closeButton') closeButton: any
  @ViewChild('contentToConvert') contentToConvert: any
  constructor(private documentService : DocService , private userService : UserService){
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

  getAllDoc(){
    this.documentService.getDocument().subscribe(res=>{
      console.log("hhhhhhhhhhh",res);
      this.allDocument = res
      this.allDocument = this.allDocument.filter((i:any)=>{
        return  i.user?.id == this.me.id
      })
      
    })
  }
  downFile(d:any){
    console.log(d);
    this.dataDoc = d
    
  }

  deleteResquet(d:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteDocument(d.id).subscribe(res=>{
          console.log(res)
          Swal.fire(
            'Good job!',
            'You deleted a request!',
            'success'
          ).then(() => {
            window.location.reload()
          })
         
        })
       
      }
    })
  }
  generatePdf() {


    const op = {
      background: 'white',
      scale: 3
    }
    setTimeout(() => {

      html2canvas(this.contentToConvert.nativeElement, op).then(async canvas => {
        const contentDataURL = await canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = await pdf.internal.pageSize.getWidth();
        var height = await canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('output.pdf');
        localStorage.removeItem('commande')
      });



    }, 0);
  }
 

  

  getType(){
    this.documentService.getEnumDocument().subscribe(res=>{
      this.types = res
    })
  }
  addSalary(){
    this.doc.status = "IN_PROGRESS"
 
    this.documentService.addDocument(this.doc , this.me.id).subscribe(res=>{
      console.log(res);
      Swal.fire(
        'Good job!',
        'You added a request!',
        'success'
      ).then(() => {
        this.closeButton.nativeElement.click()
        // this.getCurrentUser()
        this.doc = new Doc()
        window.location.reload()
      })
    })
    
  }
}
