import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': sessionStorage.getItem('token') ?? ''
  });

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = '/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-projects`, {headers});
  }

  getProjectsByTeam(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-project-by-team/${id}`, {headers});
  }

  addProject(data : any): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-project`,data, {headers});
  }

  deleteProject(id : any){
    return this.http.delete(`${this.baseUrl}/remove-project/${id}`, {headers});
  }

  editProject(data : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-project`,data, {headers});
  }
}
