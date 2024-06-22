import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../../services/userService/registration.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignInFailed = false;
  errorMessage = '';
  Toggledata = true;
  name = "mohamed"

  constructor(private registrationService: RegistrationService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.form)
    this.registrationService.login(this.form).subscribe(
      data => {
        console.log(data)
        sessionStorage.setItem("token", "Bearer " +data.accessToken);
        sessionStorage.setItem("role", data.roles[0]);
        sessionStorage.setItem("roles", JSON.stringify(data.roles));
        this.router.navigate(['/employees/employee-page']);
        //     sessionStorage.setItem("username", user);
        //     sessionStorage.setItem("id", userData.id);
        //     let tokenStr = "Bearer " + userData.token;
        //     sessionStorage.setItem("token", tokenStr);
        //     sessionStorage.setItem("roles", JSON.stringify(userData.roles));
        // this.isSuccessful = true;
        // this.isSignInFailed = false;
        // console.log('ok')
        // if (sessionStorage.getItem('roles')?.includes('ADMIN')) {
        //   this.router.navigate(['/dashboard/admin']);
        // } else {
        //   this.router.navigate(['/register']);
        // }
      },
      err => {
        console.log('nok', err)
        this.errorMessage = err;
        this.isSignInFailed = true;
      }
    );
  }

  ngOnDestroy() {
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata
  }
}
