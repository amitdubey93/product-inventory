import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { MyAlertComponent } from './components/my-alert/my-alert.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'alert', pathMatch: 'full' },
  { path: 'demo', component: DemoComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'productadd', component: ProductAddComponent },
  { path: 'alert', component: MyAlertComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
