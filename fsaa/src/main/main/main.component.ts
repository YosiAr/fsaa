import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tableData=[];
  tableStructure={
    id:'ID',
    first_name:'First Name',
    last_name:'Last Name',
    email:'Email',
    gender:'Gender',
    ip_address:'IP Address',
  }
  constructor(private api:ApiService ) {}

  ngOnInit() {
    // const element = this.getElement();
    // element.style.setProperty('--mySize', '12px');
    // element.style.setProperty('--myMargin', '0.9375vw');
    // console.log(1)
    this.api.getUserData().subscribe(data => {
      // console.log(data)
      this.tableData = JSON.parse(JSON.stringify(data));
      // console.log(this.tableData)
    });
  }
  getElement(): HTMLElement {
    return document.getElementById('main');
  }
}
