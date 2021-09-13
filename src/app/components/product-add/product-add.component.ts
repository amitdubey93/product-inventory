import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder, private apiService:ApiService) { }

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
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.apiService.addProduct(this.productForm.value).subscribe(
      (res:any)=>{
        console.log('res',res);
        
      },(error:any)=>{
        console.log("error",error);
      })
  }

}
