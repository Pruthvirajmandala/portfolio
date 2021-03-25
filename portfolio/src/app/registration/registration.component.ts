import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationRef = new FormGroup({
    fname:new FormControl(),
    lname:new FormControl(),
    username:new FormControl(),
    password:new FormControl()
  })
  msg:string = ""

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  registerAccount(){
    console.log("Taking account details")                                       //account details
    localStorage.setItem("firstname",this.registrationRef.value['firstname'])
    localStorage.setItem("lastname",this.registrationRef.value['lastname'])
    localStorage.setItem("username",this.registrationRef.value['username'])
    localStorage.setItem("password",this.registrationRef.value['password'])
    this.msg = "Your account has been created"
    this.router.navigate(['../login'])
    
  }

}
