import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/model';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'quantity', 'price'];
  products: Product[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  

  getAllProducts() {
     this.api.getAllProducts().subscribe(
       (products)=>{
         this.products = products;
         console.log(this.products);
         
       }
      /* ((res:any)=>{
        console.log(res);
        this.products = res;
      }),
      ((error:any)=>{
        console.log("err",error.message);
      }) */
    );
  }
  
}
