import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductApiService } from '../../services/product-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  pSuccess = false;
  pError = false;
  successMsg = '';
  //private service!:Subscription;
  //submitted:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private _productApiService: ProductApiService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this._fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this._productApiService.addProduct(this.productForm.value).subscribe(
      (res: any) => {
        console.log('res', res);
        this.submitted = false;
        this.pError = false;
        this.pSuccess = true;
        console.log(this.productForm.value);

        this.successMsg = this.productForm.value.productName;
        this.openSnackBar();
        //this._router.navigate(['productlist']);
        this.productForm.reset();
      },
      (error: any) => {
        console.log('error', error);
        this.pSuccess = false;
        this.pError = true;
      }
    );
  }
  /* ngOnDestroy(): void {
    this.service.unsubscribe();
  } */
  durationInSeconds = 2;
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
