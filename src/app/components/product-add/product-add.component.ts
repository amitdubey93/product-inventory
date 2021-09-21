import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  //submitted:boolean=false;
  constructor(private formBuilder:FormBuilder, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  onSubmit(){
    //this.submitted = true;
    //alert();
    if (this.productForm.invalid) {
      return;
    }
    this.apiService.addProduct(this.productForm.value).subscribe(
      (res:any)=>{
        console.log('res',res);
        //this.submitted=false; 
        
        //this.productForm.reset();
        this.router.navigate(['productlist']);
        //this.productForm.valid;
        
      },(error:any)=>{
        console.log("error",error);
      })
  }

}
