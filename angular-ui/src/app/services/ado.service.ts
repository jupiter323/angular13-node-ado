import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

const baseUrl = 'http://localhost:8081/api/workitems';

@Injectable({
  providedIn: 'root'
})
export class AdoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(baseUrl);
  }

  get(id: any): Observable<Item> {
    return this.http.get(`${baseUrl}/${id}`);
  }
 
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  } 

  findByTag(tag: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}?tag=${tag}`);
  }
}
