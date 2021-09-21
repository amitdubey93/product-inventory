import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    { title: 'Invoice', rl:'invoice' },
    { title: 'Product List', rl:'productlist'},
    { title: 'Product Add', rl:'productadd'},
    { title: 'Demo', rl:'demo'}
  ];
  constructor(public route: ActivatedRoute) { }
 
  ngOnInit(): void {
  }

}
