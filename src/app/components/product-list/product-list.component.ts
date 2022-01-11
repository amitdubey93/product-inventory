import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../domain/model';
import { ProductApiService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  pError:boolean = false;
  pDeleted:boolean = false;
  msg = '';
  displayedColumns: string[] = ['id', 'productName', 'quantity', 'price', 'actions'];
  productsList: Product[] = [];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private _productApiService: ProductApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  
  getAllProducts(){
    this._productApiService.getAllProducts().subscribe(
      (products: Product[])=>{
        this.productsList = products;
        this.dataSource = new MatTableDataSource(this.productsList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.productsList);
      },
     (error:any)=>{
       this.pError = true;
       console.log("err",error.message);
     }
   );
  }

  updateProduct(id:number){
    console.log(id);
  }
  deleteProduct(id:number){
    if (confirm('Are you sure you want to Delete this Product from database?')) {
      this._productApiService.deleteProduct(id).subscribe( res=>{
        console.log("deleteProduct: ",res);
        this.pDeleted = true;
        this.msg = res;
        this.getAllProducts();
      });
    } else {
      this.pDeleted = true;
      this.msg = "You Cancelled";
    }
   
  }
  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
