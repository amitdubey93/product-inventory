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
import { ApiService } from 'src/app/services/api.service';

//const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  filteredProductNames!: Observable<Product[]>;
  //orderServices = ['One', 'two', 'three'];
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

  productNameOp = new FormControl('', Validators.required);
  constructor(
    private _fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      customerName: [''],
      products: this._fb.array([
        this.addProductGroup(),
        this.addProductGroup(),
      ]),
      total: [''],
    });
    //this.getAllProducts();
    this.filteredProductNames = this.productNameOp.valueChanges.pipe(
      startWith(''),
      //map((value) => this._filter(value.toString()))
        map(value => typeof value === 'string' ? value : value.productName),
        map(name => name ? this._filter(name) : this.productList.slice())
        //map(value => this._filter(value))
    );
    //this.invoiceForm.valueChanges.subscribe(console.log);
    this.invoiceForm.get('products')?.valueChanges.subscribe((values) => {
      this.total = 0;
      const ctrl = <FormArray>this.invoiceForm.controls['products'];
      ctrl.controls.forEach((x) => {
        /* let price1 = parseInt(x.get('price')?.value);
          let quantity1 = parseInt(x.get('quantity')?.value);
          let x1 = price1 * quantity1;
          console.log("x1",x1);
          
          x.get('subtotal')?.setValue(x1); */
        //console.log("hello");
        //x.get('subtotal')?.setValue(111);
        let parsed = parseFloat(
          x.get('subtotal')?.value === '' ? 0 : x.get('subtotal')?.value
        );
        this.total += parsed;
        this.ref.detectChanges();
      });
    });
    /* this.invoiceForm.get('products')?.valueChanges.subscribe(values => {
        resolvedPromise.then(() => {
          this.total = values.reduce((acc: number, cur: { subtotal: number | string; }) => acc + (+cur.subtotal), 0);
        });
      }) */
  }
  displayFn(product: Product): string {
    return product && product.productName ? product.productName : '';
  }

  private _filter(productName: string): Product[] {
    const filterValue = productName.toLowerCase();

    return this.productList.filter((option) =>
      option.productName.toLowerCase().includes(filterValue)
    );
  }
  /* private _filter(value: string, key: string): string[] {
    const filterValue = value.toLowerCase();
    return this.orderServices.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
  } */
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
  getAllProducts() {
    this.api.getAllProducts().subscribe(
      (products) => {
        this.productList = products;
        console.log(products);
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
