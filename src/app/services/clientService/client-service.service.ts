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
export class ClientServiceService {

  private baseUrl = '/client';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-clients`, {headers});
  }

  addClient(data : any): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-client`,data, {headers});
  }

  editClient(data : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-client`,data, {headers});
  }

  deleteClients(id:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-client/${id}`, {headers});
  }
}






