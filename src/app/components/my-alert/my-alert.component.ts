import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  currentRate =1;

  time = {hour: 0, minute: 0};
  meridian = false;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  show = true;

  close() {
    this.show = false;
    setTimeout(() => this.show = true, 3000);
  }
}
