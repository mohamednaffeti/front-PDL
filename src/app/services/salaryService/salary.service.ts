


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
export class SalaryService {
  private baseUrl = '/salary';

  constructor(private http: HttpClient) { }

  getSalary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-salaries`, {headers});
  }

  addSalary(data : any  ): Observable<any>{
    return this.http.post(`${this.baseUrl}/add-salary`,data, {headers});
  }

  deleteSalary(id : any){
    return this.http.delete(`${this.baseUrl}/remove-salary/${id}`, {headers});
  }

  editSalary(data : any): Observable<any>{
    return this.http.put(`${this.baseUrl}/modify-salary`,data, {headers});
  }

  getTypeStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-all-statusType`, {headers});
  }
}
