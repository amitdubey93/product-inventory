import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
     this.api.getAllProducts().subscribe(
      ((res:any)=>{
        console.log(res);
        this.products = res;
      }),
      ((error:any)=>{
        console.log("err",error.message);
      })
    );
  }
  
}
