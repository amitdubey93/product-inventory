import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../domain/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'http://localhost:8080/api/product/';
  constructor(private http: HttpClient) {}

  getAllProducts():Observable<Product[]> {
    console.log(this.BASE_URL);
    return this.http.get<Product[]>(this.BASE_URL);
  }
  addProduct(product:any){
    return this.http.post(this.BASE_URL,product);
  }
}
