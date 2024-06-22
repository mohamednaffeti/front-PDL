


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
export class SalaireService {
  private baseUrl = '/salaire';

  constructor(private http: HttpClient) { }

  getSalary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-salaries`, {headers});
  }

  addSalary(data : any ): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-salary`,data, {headers});
  }

  deleteSalary(id : any){
    return this.http.delete(`${this.baseUrl}/remove-salary/${id}`, {headers});
  }

  editSalaire(data:any , id :any): Observable<any>{
    return this.http.put(`${this.baseUrl}/edit-salary/${id}`,data, {headers});
  }


}
