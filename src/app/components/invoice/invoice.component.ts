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
import { Product } from '../../domain/model';
import { InvoiceApiService } from '../../services/invoice-api.service';

export interface ProductRow {
  productName: string;
  price: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  options: string[] | any = [];
  filteredOptions: Observable<ProductRow[]>[] | any= [];

  invoiceForm!: FormGroup;
  submitted: boolean = false;
  total = 0;
  constructor(
    private _fb: FormBuilder,
    private _ref: ChangeDetectorRef,
    private _invoiceApi: InvoiceApiService
  ) {
    
  }

  createForm(){
    this.invoiceForm = this._fb.group({
      customerName: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(7)],
      ],
      products: this._fb.array([
        this.addProductGroup(),
        this.addProductGroup(),
      ]),
      total: [''],
    });

    
  }
  ngAfterViewInit():void{
    this.ManageNameControl(0);
    this.ManageNameControl(1);
  }
  ngOnInit(): void {
    this.createForm();

    this._invoiceApi.getAllProductName().subscribe(
      (res: any) => {
        console.log('Autocomplete Data: ', res);
        this.options = res;
      },
      (err) => {
        console.log('error occured: ', err);
      }
    );

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

  ManageNameControl(index: number) {
    var arrayControl = this.invoiceForm.get('products') as FormArray;
    //console.log("log from manage; ",index);
    console.log(arrayControl.at(index).get('productName'));
    
    this.filteredOptions[index] = arrayControl.at(index).get('productName')?.valueChanges
    .pipe(
      startWith<string | ProductRow>(''),
      map(value => typeof value === 'string' ? value : value.productName),
      map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayProduct(productRow: ProductRow): string {
    if (productRow) {
        return `${productRow.productName} ${productRow.price}`;
    }
    return '';
}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  matAutocomplete(i: string | number) {
    //console.log(this.invoiceForm);
    console.log(this.productsArray.get(i.toString()));

    /* this.filteredOptions = this.productsArray.get(i.toString())?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ); */
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
      (res: any) => {
        this.invoiceForm.reset();
        this.submitted = false;
        console.log('res', res);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  addNewProduct() {
    this.productsArray.push(this.addProductGroup());
    this.ManageNameControl(this.productsArray.length - 1);
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
