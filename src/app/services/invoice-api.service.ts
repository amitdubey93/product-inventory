import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApiService {
  BASE_URL = 'http://localhost:8080/api/invoice/';
  constructor(private _http: HttpClient) {}

  
  addInvoice(invoice:any){
    return this._http.post(this.BASE_URL,invoice);
  }

  
}
