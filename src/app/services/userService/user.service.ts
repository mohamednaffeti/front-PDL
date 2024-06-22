import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';


//const headers = new HttpHeaders().set('Authorization',  sessionStorage.getItem('token')??'').set('Content-Type', 'application/json')
const
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': sessionStorage.getItem('token') ?? ''
  });
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/user';

  constructor(private http: HttpClient) {
  }
  addUser(user: any): Observable<any> {
    return this.http.post('/user/add-user', {
      email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName,
      password: user.password, dateOfJoin: user.dateOfJoin, active: true, roles: [{ id: user.role }],
      department: user.department, designation: user.designation
    }, { headers });
  }

  editUser(user: any): Observable<any> {
    return this.http.patch('/user/modify-user', user, { headers });
  }

  getUsers(): Observable<any> {
    return this.http.get('/user/retrieve-all-users', { headers });
  }

  getUserById(id: any): Observable<any> {
    return this.http.get('/user/retrieve-user/' + id, { headers });
  }

  getRoles(): Observable<any> {
    return this.http.get('/role/retrieve-all-roles', { headers });
  }

  getDepartments(): Observable<any> {
    return this.http.get('/department/retrieve-all-departments');
  }

  getEmployees(): Observable<any> {
    return this.http.get('/user/retrieve-all-users', { headers });
  }

  getDesignations(): Observable<any> {
    return this.http.get('/designation/retrieve-all-designations');
  }
  retrieveUser(id: number): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'retrieve-user/{user-id}', id);
  }

  removeUser(id: number): Observable<object> {
    return this.http.delete(this.baseUrl + '/remove-user/' + id, { headers });
  }

  getCurrentUserInformation(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/retrieve-user/' + sessionStorage.getItem('id'), { headers });
  }

  getManagers(): Observable<any> {
    return this.http.get('/user/retrieve-all-managers');
  }

  getUsersByTeam(id: any): Observable<any> {
    return this.http.get('/user/get-all-users-by-team/' + id, { headers });
  }
  affectUserToTeam(idTeam: any, idUser: any, status: any): Observable<any> {
    return this.http.get('/user/affect-team-to-user/' + idTeam + '/' + idUser + '/' + status, { headers });
  }


}
