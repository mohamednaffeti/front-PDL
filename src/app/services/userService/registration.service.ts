import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "./user.service";


const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private http: HttpClient) {
  }


  register(user: any): Observable<any> {
    return this.http.post('/user/registration', {
      email: user.email, username: user.username, firstName : user.firstName, lastName : user.lastName,
      password: user.password, dateOfJoin : user.dateOfJoin, phone : user.phone, birthDay : user.birthDay,
      department: user.department, designation : user.designation
    }, {headers, responseType: 'text'});
  }

  login(user: any) {
    console.log("user",user)
    return this.http.post<any>('/authenticate',
      {username: user.username, password: user.password}, {headers})
      .pipe(
        map(userData => {
          console.log(userData)
          console.log(userData,"userdata")
          sessionStorage.setItem("username", user);
          sessionStorage.setItem("id", userData.id);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("roles", JSON.stringify(userData.roles));
          return userData;
        })
      );

     
  }
}
