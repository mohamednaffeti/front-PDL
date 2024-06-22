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
export class TeamService {

  private baseUrl = '/team';

  constructor(private http: HttpClient) { }
  
  getTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-teams`, {headers});
  }

  addTeams(data : any): Observable<any>{
    console.log('testtest' , data)
    return this.http.post(`${this.baseUrl}/add-team`,data, {headers});
  }

  editTeam(data : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-team`,data, {headers});
  }

  deleteTeam(id:any){
    return this.http.delete(`${this.baseUrl}/remove-team/${id}`, {headers});
  }
}
