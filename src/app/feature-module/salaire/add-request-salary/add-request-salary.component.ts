import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SalaryService } from 'src/app/services/salaryService/salary.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-request-salary',
  templateUrl: './add-request-salary.component.html',
  styleUrls: ['./add-request-salary.component.scss']
})
export class AddRequestSalaryComponent implements OnInit {
  constructor(private userService: UserService, public router: Router, private formBuilder: FormBuilder, private salaryService: SalaryService) {
    this.getCurrentUser()
    this.getTypeStatus()
  }
  ngOnInit(): void {
    this.addSalaireForm = this.formBuilder.group({
      description: ["", [Validators.required]],
      value: ["", [Validators.required]],
      status: ["", [Validators.required]],
      date: ["", []],
      user: [{}, [Validators.required]],
    });
   this.salaryService.getSalary().subscribe(res=>{
    console.log(res)
    this.salarie = res
    this.salarie = this.salarie.filter((i:any)=>{
      return i.user?.id == this.me?.id
    })
   })
  }
  public addSalaireForm: FormGroup | any;
  @ViewChild('closeButton') closeButton: any
  me: any
  salarie: any
  types : any
  addSalary() {
    this.addSalaireForm.value.user = this.me
    this.addSalaireForm.value.date = new Date()
    this.addSalaireForm.value.status = 'IN_PROGRESS'
    // this.addSalaireForm.value.user = this.me
    console.log(this.addSalaireForm)
    this.salaryService.addSalary(this.addSalaireForm.value ).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Good job!',
        'You added a request!',
        'success'
      ).then(() => {
        this.closeButton.nativeElement.click()
        window.location.reload()
      })
    })

  }

  getCurrentUser() {
    if (sessionStorage.getItem('roles')) {
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
        console.log('me', res)
        this.me = res
        this.salarie = this.me.salaryRequest
        console.log(this.salarie);
        


      })
    }
  }


  getTypeStatus(){
    this.salaryService.getTypeStatus().subscribe(res=>{
      this.types = res
      console.log(this.types)
    })
  }

}
