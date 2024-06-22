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
export class TacheService {

  private baseUrl = '/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-tasks`, {headers});
  }

  getTaskStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-status`, {headers});
  }

  addTask(data : any ): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-task`,data, {headers});
  }

  editTask(data : any , id : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-task/${id}`,data, {headers});
  }

  deleteTask(id:any){
    return this.http.delete(`${this.baseUrl}/remove-task/${id}`, {headers});
  }
}
