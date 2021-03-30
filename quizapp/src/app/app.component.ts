import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  flag:boolean = false;
  b1:string = "Show test";
  ngOnInit(): void {

  }
  
  open(){
    this.flag = !this.flag;
    if (this.flag) {this.b1 = "Close test";}
    else {this.b1 = "Show test";}
  }
}