import { Component, OnInit, Input, Output, EventEmitter , OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegistrationService } from "../../../../services/userService/registration.service";
import { UserService } from "../../../../services/userService/user.service";
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
}
@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit  {
  addForm: any = {};
  editForm : any
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  RolesList: any;
  DepartmentList: any;
  DesignationList: any;
  @Input() employeeId: any;



  constructor(private userService: UserService) {
    console.log(this.employeeId)
  }



  ngOnInit(): void {
    console.log('Received employeeId:', this.employeeId);
    // this.editForm = this.employeeId
    if(this.employeeId){

      this.userService.getUserById(this.employeeId).subscribe(res=>{
        this.editForm = this.employeeId
      })
    }
    this.getRoles();
    this.getDepartments();
    this.getDesignations();
  }

  

  addUser(): void {
    console.log(this.addForm)
    this.userService.addUser(this.addForm).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }

    });

  }


  getRoles() {
    this.userService.getRoles().subscribe(
      response => {
        this.RolesList = response;
        console.log(response)
      }
    )
  }

  getDepartments() {
    this.userService.getDepartments().subscribe(
      response => {
        this.DepartmentList = response;
        console.log(response)
      }
    )
  }

  getDesignations() {
    this.userService.getDesignations().subscribe(
      response => {
        this.DesignationList = response;
        console.log(response)
      }
    )
  }


  editUser(): void {
    console.log('Received employeeId:', this.employeeId);
    console.log('Received employeeId:', this.editForm);
    // this.editForm.id = this.employeeId.id;
    // this.userService.editUser(this.editForm).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error: err => {
    //     console.log('error:', err.error.message)
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }

    // });

  }

  removeUser() {
    console.log('Received employeeId:', this.employeeId);

    this.userService.removeUser(this.employeeId).subscribe({
      next: (res) => {
        console.log("User deleted successfully ");
        //this.getEmployees();
      },
      error: () => {
        alert("Error while deleting the user !")
      }
    })
  }


  ngOnDestroy() {
  }

}
