import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../domain/model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  BASE_URL = 'http://localhost:8080/api/product/';
  constructor(private _http: HttpClient) {}

  getAllProducts():Observable<Product[]> {
    console.log(this.BASE_URL);
    return this._http.get<Product[]>(this.BASE_URL);
  }
  addProduct(product:any){
    return this._http.post(this.BASE_URL,product);
  }
}
