import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {

  name = 'Friend';
  frm!: FormGroup;

  constructor(private builder: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
    this.populateRows();
  }

  buildForm() {
    this.frm = this.builder.group({
      total: [{ value: '', disabled: true }],
      mean: [{ value: '', disabled: true }],
      wgtAvg: [{ value: '', disabled: true }],
      arr: this.builder.array([])
    });
    this.frm.get('arr')?.valueChanges.subscribe(console.log);
    this.frm.get('arr')?.valueChanges
      .subscribe((newVal) => {
        // newVal contains the whole array

        // We're patching the value of total control
        this.frm.get('total')?.patchValue(
          // Use the newVal array to calculate the sum using reduce
          newVal.reduce((acc: number, curr: { value: string | number; }) => {
            // interpret curr.value as a number using (+x) operator
            return acc + (+curr.value);
          }, 0)
        )

        // We're patching the value of mean control
        this.frm.get('mean')?.patchValue(
          newVal.reduce((acc: number, curr: { value: string | number; }) => {
            return acc + (+curr.value);
          }, 0) / newVal.length
        )

        // We're patching the value of wgtAvg control
        this.frm.get('wgtAvg')?.patchValue(
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
        )
      });
  }

  populateRows() {
    for (let i = 0; i < 5; ++i) {
      this.newRow(i);
    }
  }

  newRow(i = 0) {
    const fArr: FormArray = this.frm.get('arr') as FormArray;
    fArr.push(this.newGroup(i));
  }

  removeRow(i: number) {
    const fArr: FormArray = this.frm.get('arr') as FormArray;
    fArr.removeAt(i);
  }

  newGroup(i = 0) {
    return this.builder.group({
      quantity: i+1,
      value: i
    });
  }
  trackByIndex(index: number, value: string) {
    return index;
  }

  /* constructor(private _fb: FormBuilder) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      customerName: '',
      phone: '',
      products: this._fb.array([
        this._fb.group({
          productName: '',
          price: '',
        })
      ])
    });
    //console.log(this.form.controls.products.valueChanges.subscribe(console.log));
    //console.log(this.form.get('products'));
    this.productsArray.valueChanges.subscribe(console.log)
    console.log(this.productsArray.controls);
    
    //console.log();
    
    
  }

  trackByIndex(index:number,value:string){
    return index;
  }
  addProductGroup() {
    return this._fb.group({
      productName: '',
      price: '',
    });
  }

  get productsArray() {
    return this.form.get('products') as FormArray;
  }
  addNewProduct() {
    this.productsArray.push(this.addProductGroup());
  }
  removeProduct(i: number) {
    if (this.productsArray.length == 1) {
      return;
    }
    this.productsArray.removeAt(i);
  } */
}
