import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'http://localhost:8080/api/product/';
  constructor(private http: HttpClient) {}

  
  
  getAllProducts():Observable<ApiService> {
    console.log(this.BASE_URL);
    return this.http.get(this.BASE_URL)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  addProduct(product:any){
    return this.http.post(this.BASE_URL,product);
  }
}
