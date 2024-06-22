import {Component, OnInit} from "@angular/core";
import {RegistrationService} from "../../../services/userService/registration.service";
import {UserService} from "../../../services/userService/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  DepartmentList : any;
  DesignationList : any;
  managerList : any;


  constructor(
    private registrationService: RegistrationService, private userService: UserService,
    private router : Router) {
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getDesignations();
    this.getManagers();
  }

  onSubmit(): void {
    this.registrationService.register(this.form).subscribe(
      data => {
        console.log(data);
       
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/login')
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ngOnDestroy() {
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

  getManagers() {
    this.userService.getManagers().subscribe(
      response => {
        this.managerList = response;
        console.log('response',response)
      }
    )
  }

}
