import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  active = "invoice";
  collapsed = true;

  constructor(public route: ActivatedRoute) { }
 
  ngOnInit(): void {
  }
  
  links = [
    { title: 'Invoice', rl:'invoice',fragment:'invoice' },
    { title: 'Product List', rl:'productlist',fragment:'productlist'},
    { title: 'Product Add', rl:'productadd',fragment:'productadd'},
    // { title: 'Demo', rl:'demo',fragment:'demo'},
    { title: 'Alert', rl:'alert',fragment:'alert'}
  ];
  
  
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
