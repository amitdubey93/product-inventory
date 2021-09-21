import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/domain/model';

const resolvedPromise = Promise.resolve(null);
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  submitted: boolean = false;
  total=0;
  constructor(private _fb: FormBuilder,private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      customerName: [''],
      products: this._fb.array([this.addProductGroup(),this.addProductGroup()]),
      total:['']
    });
    //this.invoiceForm.valueChanges.subscribe(console.log);
    this.invoiceForm.get('products')?.valueChanges.subscribe(values => {
      this.total = 0;
      const ctrl = <FormArray>this.invoiceForm.controls['products'];
        ctrl.controls.forEach(x => {
          /* let price1 = parseInt(x.get('price')?.value);
          let quantity1 = parseInt(x.get('quantity')?.value);
          let x1 = price1 * quantity1;
          console.log("x1",x1);
          
          x.get('subtotal')?.setValue(x1); */
          //console.log("hello");
          //x.get('subtotal')?.setValue(111);
          let parsed = parseFloat(x.get('subtotal')?.value === '' ? 0 : x.get('subtotal')?.value)
          this.total += parsed
          this.ref.detectChanges()
        });
      })
      /* this.invoiceForm.get('products')?.valueChanges.subscribe(values => {
        resolvedPromise.then(() => {
          this.total = values.reduce((acc: number, cur: { subtotal: number | string; }) => acc + (+cur.subtotal), 0);
        });
      }) */
    this.calculation();
    
  }

  calculation(){
    this.invoiceForm.valueChanges
      .subscribe(newVal => {
        // newVal contains the whole array

        
        // We're patching the value of total control
        /* this.invoiceForm.get('total')?.patchValue(
          // Use the newVal array to calculate the sum using reduce
          newVal.reduce((prev:  number, curr: { subtotal: string | number; }) => {
            // interpret curr.value as a number using (+x) operator
            return prev + (+curr.subtotal);
          }, 0) / newVal.length
        ) */

        // We're patching the value of mean control
        /* this.invoiceForm.get('mean')?.patchValue(
          newVal.reduce((acc: number, curr: { value: string | number; }) => {
            return acc + (+curr.value);
          }, 0) / newVal.length
        ) */

        // We're patching the value of wgtAvg control
        /* this.invoiceForm.get('wgtAvg')?.patchValue(
          newVal.reduce((prev: { sumOfProducts: number; sumOfQuantities: number; finalValue: number; }, curr: { value: string; quantity: string; }) => {
            prev.sumOfProducts += (parseFloat(curr.value) * parseFloat(curr.quantity));
            prev.sumOfQuantities += parseFloat(curr.quantity);
            prev.finalValue = prev.sumOfProducts / prev.sumOfQuantities;
            return prev;
          }, {
            sumOfProducts: 0,
            sumOfQuantities: 0,
            finalValue: 0
          }).finalValue
        ) */
      });
  }
  
  addProductGroup() {
    return this._fb.group({
      productName: [''],
      price: [''],
      quantity: [''],
      subtotal: [''],
    });
  }
  trackByIndex(index: number, value: string) {
    return index;
  }
  /* get f(): { [key: string]: AbstractControl } {
    return this.invoiceForm.controls;
  } */
  onSubmit() {
    this.submitted = true;
    console.log('valid: ', this.invoiceForm.valid);
    console.log('invoiceForm: ', this.invoiceForm.value);

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

  addNewProduct() {
    this.productsArray.push(this.addProductGroup());
  }
  removeProduct(i: number) {
    if (this.productsArray.length == 1) {
      return;
    }
    console.log("removeProduct",i);
    
    this.productsArray.removeAt(0);
  }

  get customerName() {
    return this.invoiceForm.get('customerName');
  }

  get productsArray() {
    return <FormArray>this.invoiceForm.controls['products'];
    //return <FormArray>this.invoiceForm.get('products');
  }

  
  calc(i: string | number) {
    //console.log("price",this.invoiceForm.value.products[i].price);
    //console.log("quantity",this.invoiceForm.value.products[i].quantity);
    
    this.invoiceForm.value.products[i].subtotal = this.invoiceForm.value.products[i].price * this.invoiceForm.value.products[i].quantity;
    this.invoiceForm.controls['products'].setValue(this.invoiceForm.value.products);
    //console.log("subtotal",this.invoiceForm.value.products[i].subtotal);
 }
}
