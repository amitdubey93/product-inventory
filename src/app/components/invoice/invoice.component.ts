import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      customerName: [''],
      products: this.formBuilder.array([
        this.formBuilder.group({
          productName: [''],
          quantity: [''],
          price: [''],
          /*  productName: ['', Validators.required],
          quantity: ['', Validators.required],
          price: ['', Validators.required], */
        }),
      ]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.invoiceForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('valid: ', this.invoiceForm.valid);

    if (this.invoiceForm.invalid) {
      return;
    }
    /* this.apiService.addProduct(this.productForm.value).subscribe(
      (res:any)=>{
        console.log('res',res);
        
      },(error:any)=>{
        console.log("error",error);
      }) */
  }
  get items() {
    return this.invoiceForm.get('products') as FormArray;
  }
  addNewItem() {
    //const itemLength = this.items.length;
    console.log('aa: ', this.invoiceForm.controls.products);

    //let productArray = this.invoiceForm.controls.products as FormArray;
    const newItem = this.formBuilder.group({
      productName: [''],
      quantity: [''],
      price: [''],
    });
    this.items.push(newItem);
    //productArray.insert(arraylen, newItem);
  }
  removeItem(i: number) {
    if(this.items.length==1){
      return;
    }
    this.items.removeAt(i);
    //alert(i);
  }
  
}
