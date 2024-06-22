


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
export class DocService {
  private baseUrl = '/document';

  constructor(private http: HttpClient) { }

  getDocument(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-documents`, {headers});
  }
  getEnumDocument(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-enumdesignations`, {headers});
  }
  addDocument(data : any , id : any): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-document/${id}`,data, {headers});
  }

  editDocument(data : any , id : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-document/${id}`,data, {headers});
  }

  deleteDocument(id : any){
    return this.http.delete(`${this.baseUrl}/remove-document/${id}`, {headers});
  }


}
