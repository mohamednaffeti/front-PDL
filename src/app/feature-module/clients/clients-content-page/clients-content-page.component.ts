import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClientServiceService } from 'src/app/services/clientService/client-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clients-content-page',
  templateUrl: './clients-content-page.component.html',
  styleUrls: ['./clients-content-page.component.scss'],
})
export class ClientsContentPageComponent implements OnInit {
  public companiesList: any[] | any;
  public clientsData: any[] | any;
  public addClientForm: FormGroup | any;
  public editClientForm: FormGroup | any;
  role = sessionStorage.getItem('role')
  @ViewChild('addClientModel') addClientModel: any 
  @ViewChild('editClientModel') editClientModel: any 
  lstClient : any
  constructor(public router: Router, private dataservice: DataService, private formBuilder: FormBuilder, private clientService: ClientServiceService) {
    // this.companiesList = this.dataservice.companiesList;
    // this.clientsData = this.dataservice.clientsDatas;
    this.getAllClients()
  }
  ngOnInit(): void {
    this.addClientForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      id: ["", []],
      projects : [[] , []]
    });
  }

  addClient() {
    console.log(this.addClientForm.value)
    this.clientService.addClient(this.addClientForm.value).subscribe(res => {
      console.log(res)
      
      Swal.fire(
        'Good job!',
        'You added a client!',
        'success'
      ).then(()=>{
        this.addClientModel.nativeElement.click()
        this.getAllClients()
      })
    })
  }

  filterName(data:any){
    console.log(data.target.value )
    if (data.target.value == '') {
      console.log('HERE')
      this.getAllClients()
    } else {
      this.clientService.getClients().subscribe(
        (response) => {
          var fullName = data.target.value
          console.log('response', response)
          
          this.clientsData = response;
          this.clientsData = this.clientsData.filter((item: any) => {
            console.log('response', fullName ,item.name.toLowerCase().includes(fullName.toLowerCase() ))
           return item.name.toLowerCase().includes(fullName.toLowerCase())
          });
        }
      )
    }
  }

  editClient(data : any){
    this.editClientForm.patchValue({
      name : data.name,
      email : data.email,
      phone : data.phone,
      id : data.id
    })
    console.log(this.editClientForm.value )

  }

  postEdit(){
    console.log('postEdit' , this.editClientForm.value)
    this.clientService.editClient(this.editClientForm.value).subscribe(res=>{
      Swal.fire(
        'Good job!',
        'client updated succefully',
        'success'
        ).then(()=>{
        this.editClientModel.nativeElement.click()

      })
    })
  }

  deleteClient(id : any){
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
        this.clientService.deleteClients(id).subscribe(res=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(()=>{
            this.getAllClients()
          })
        })
       
      }
    })
  }

  getAllClients(){
    this.clientService.getClients().subscribe(res=>{
      this.clientsData = res
      console.log(this.clientsData)
    })
  }
}
