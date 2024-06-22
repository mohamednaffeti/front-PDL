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
export class AbsencesService {
  private baseUrl = '/leave';

  constructor(private http: HttpClient) { }

  getAbsences(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-leaves`, {headers});
  }
  getTypeAbsences(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-leavesType`, {headers});
  }

  addAbsences(data : any , id : any): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-leave/`,data, {headers});
  }

  editAbsences(data : any , id : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-leave/`,data, {headers});
  }

  deleteAbsences(id:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-leave/`, {headers});
  }
}
