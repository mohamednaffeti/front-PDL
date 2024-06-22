import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/userService/user.service";
import Swal from 'sweetalert2';

class Employee {
  firstName : any
  lastName : any
  username : any
  email : any
  password : any
  confirmPassword : any
  dateOfJoin : any
  phone : any
  id : any
  role : any
  department : any
  designation :any
  passportNumber : any
  passportExpiration : any
  nationality : any
}


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  user: any;
  showModal = false;
  editForm = new Employee()
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  RolesList: any;
  DepartmentList: any;
  DesignationList: any;
  employeeId : any
  @ViewChild('closeButton') closeButton: any
  @ViewChild('closeButtonn') closeButtonn: any
  @ViewChild('addClose') addClose: any
  @ViewChild('closeButtonDelete') closeButtonDelete: any
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUserInformation();
  }


  getCurrentUserInformation() {
    this.userService.getCurrentUserInformation().subscribe(
      response => {
        console.log('current user info',response);
        this.user = response;
        this.editForm = this.user
        console.log(response)
      }
    )
  }

  editUser(): void {
    console.log('Received employeeId:', this.employeeId);
    console.log('Received employeeId:------------', this.editForm);
   
    this.userService.editUser(this.editForm).subscribe({
      next: data => {
        console.log(data);
  

        Swal.fire(
          'Good job!',
          'You edited the user!',
          'success'
        ).then(()=>{
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.closeButton.nativeElement.click()
          this.closeButtonn.nativeElement.click()
          this.getCurrentUserInformation()
        })
      },
      error: err => {
        console.log('error:', err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }

    });

  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.userService.getCurrentUserInformation();
  }
}
