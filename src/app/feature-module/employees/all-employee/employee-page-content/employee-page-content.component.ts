import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../../services/userService/user.service";
import { EmployeeModalComponent } from "../employee-modal/employee-modal.component";
import { AnyComponent } from '@fullcalendar/core/preact';
import Swal from 'sweetalert2';
class Employee {
  firstName: any
  lastName: any
  username: any
  email: any
  password: any
  confirmPassword: any
  dateOfJoin: any
  phone: any
  id: any
  role: any
  department: any
  designation: any
  team : any
}
@Component({
  selector: 'app-employee-page-content',
  templateUrl: './employee-page-content.component.html',
  styleUrls: ['./employee-page-content.component.scss']
})
export class EmployeePageContentComponent implements OnInit {
  selected = 'option2';
  addForm = new Employee()
  editForm = new Employee()
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  RolesList: any;
  DepartmentList: any;
  DesignationList: any;
  employeeId: any
  user: any
  filterDev: any = "*"
  searchKeyword = ''
  me : any
  isAdmin = sessionStorage.getItem('roles')?.includes('ADMIN')
  @ViewChild('closeButton') closeButton: any
  @ViewChild('addClose') addClose: any
  @ViewChild('closeButtonDelete') closeButtonDelete: any

   lstEmployee: any = []
  constructor(public router: Router, private userService: UserService) {
    
    if(sessionStorage.getItem('roles') && !sessionStorage.getItem('roles')?.includes('ADMIN')){
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe(res=>{
        console.log('me',res)
        this.me = res
        
       
      })
    }


  }

  @ViewChild(EmployeeModalComponent) employeeModalComponent: EmployeeModalComponent | any;
  getListUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log('response', response)
        this.lstEmployee = response;
        // if(sessionStorage.getItem('roles')?.includes('ADMIN')){
        //   this.lstEmployee = response;
        // }else if(sessionStorage.getItem('roles')?.includes('MANAGER') || sessionStorage.getItem('roles')?.includes('EMPLOYEE')){
        //   if(this.me.team){
        //     this.lstEmployee = this.me.team.users
        //   }else{
        //     this.lstEmployee.push(this.me)
        //   }
        // }else{
        //   this.router.navigateByUrl('/login')
        // }
        
      }
    )
  }

  reset(){
    this.getListUsers()
  }

  filterSelectDev(data: any) {
    if (data == "*") {
      this.getListUsers()
    } else {
      this.userService.getUsers().subscribe(
        (response) => {
          console.log('response', response)
          this.lstEmployee = response;
          this.lstEmployee = this.lstEmployee.filter((i: any) => {
            return i.department == data
          })
          console.log(response)
        }
      )
    }
  }

  filterId(data: any) {
    console.log(data.target.value)
    if (data.target.value == '') {
      console.log('HERE')
      this.getListUsers()
    } else {
      this.userService.getUsers().subscribe(
        (response) => {
          console.log('response', response)
          this.lstEmployee = response;
          this.lstEmployee = this.lstEmployee.filter((item: any) => {
            return item.id == data.target.value
          });
        }
      )
    }
  }
  filterName(data:any){
    console.log(data.target.value )
    if (data.target.value == '') {
      console.log('HERE')
      this.getListUsers()
    } else {
      this.userService.getUsers().subscribe(
        (response) => {
          var fullName = data.target.value
          console.log('response', response)
          this.lstEmployee = response;
          this.lstEmployee = this.lstEmployee.filter((item: any) => {
           return (item.firstName.toLowerCase().includes(fullName.toLowerCase()) || item.lastName.toLowerCase().includes(fullName.toLowerCase()) )
          });
        }
      )
    }
  }
  transferEmployeeId(employeeId: any) {
    this.editForm = employeeId
    this.editForm.dateOfJoin = new Date(this.editForm.dateOfJoin)
    console.log(this.editForm)
    // Set the employeeId property of the child component
    // this.employeeModalComponent.employeeId = employeeId;
  }

  ngOnInit(): void {
    this.getRoles();
    this.getDepartments();
    this.getDesignations();
    this.getListUsers()
  }

  addUser(): void {
    console.log(this.addForm)
    this.addForm.team = 1
    this.userService.addUser(this.addForm).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.addClose.nativeElement.click()
        Swal.fire(
          'Good job!',
          'You added an user!',
          'success'
        ).then(() => {
          this.getListUsers()
        })
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }

    });

  }

  view(emp: any) {
    this.user = emp
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
    this.userService.editUser(this.editForm).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.closeButton.nativeElement.click()

        Swal.fire(
          'Good job!',
          'You edited the user!',
          'success'
        ).then(() => {
          this.getListUsers()
        })
      },
      error: err => {
        console.log('error:', err.error.message)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });

  }

  removeUser() {
    console.log(this.editForm.id)
    this.userService.removeUser(this.editForm.id).subscribe({
      next: (res) => {
        console.log("User deleted successfully ");
        //this.getEmployees();
        this.closeButtonDelete.nativeElement.click()

        Swal.fire(
          'Good job!',
          'You deleted the user!',
          'success'
        )
      },
      error: () => {
        alert("Error while deleting the user !")
      }
    })
  }

}
