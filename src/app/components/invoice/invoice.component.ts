import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/domain/model';
import { InvoiceApiService } from '../../services/invoice-api.service';

//const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  filteredProductNames!: Observable<Product[]>;
  invoiceForm!: FormGroup;
  submitted: boolean = false;
  total = 0;
  productList: Product[] = [
    {
      id: 1,
      productName: 'mobile',
      quantity: 1,
      price: 1,
    },
    {
      id: 2,
      productName: 'laptop',
      quantity: 1,
      price: 1,
    },
  ];

  //productNameOp = new FormControl('', Validators.required);
  constructor(
    private _fb: FormBuilder,
    private _ref: ChangeDetectorRef,
    private _invoiceApi: InvoiceApiService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      customerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      products: this._fb.array([
        this.addProductGroup(),
        this.addProductGroup(),
      ]),
      total: [''],
    });
    
    //this.invoiceForm.valueChanges.subscribe(console.log);
    this.invoiceForm.get('products')?.valueChanges.subscribe((values) => {
      this.total = 0;
      const ctrl = <FormArray>this.invoiceForm.controls['products'];
      ctrl.controls.forEach((x) => {
        let parsed = parseFloat(
          x.get('subtotal')?.value === '' ? 0 : x.get('subtotal')?.value
        );
        this.total += parsed;
        this.invoiceForm.controls.total.setValue(this.total);
        this._ref.detectChanges();
      });
    });
  }
  
 
  calc(i: string | number) {
    //console.log("price",this.invoiceForm.value.products[i].price);
    //console.log("quantity",this.invoiceForm.value.products[i].quantity);

    this.invoiceForm.value.products[i].subtotal =
      this.invoiceForm.value.products[i].price *
      this.invoiceForm.value.products[i].quantity;
    this.invoiceForm.controls['products'].setValue(
      this.invoiceForm.value.products
    );
    //console.log("subtotal",this.invoiceForm.value.products[i].subtotal);
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

  onSubmit() {
    this.submitted = true;
    console.log('valid: ', this.invoiceForm.valid);
    console.log('invoiceForm: ', this.invoiceForm.value);

    if (this.invoiceForm.invalid) {
      return;
    }
    this._invoiceApi.addInvoice(this.invoiceForm.value).subscribe(
      (res:any)=>{
        console.log('res',res);
        
      },(error:any)=>{
        console.log("error",error);
      })
  }

  addNewProduct() {
    this.productsArray.push(this.addProductGroup());
  }

  removeProduct(i: number) {
    if (this.productsArray.length == 1) {
      return;
    }
    console.log('removeProduct', i);
    this.productsArray.removeAt(i);
  }

  get customerName() {
    return this.invoiceForm.get('customerName');
  }

  get productsArray() {
    return <FormArray>this.invoiceForm.controls['products'];
    //return <FormArray>this.invoiceForm.get('products');
  }
  
  
}
