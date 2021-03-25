import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef = new FormGroup({
    username:new FormControl(),
    password:new FormControl()
  })
  msg:string = ''
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  checkCredentials(){
    if(!localStorage['username']){
      this.msg = "No Credentials!"
    }
    else{
      console.log("Found Creds")
    }
    if(this.loginRef.value['username'] == null || this.loginRef.value['password']== null){
      this.msg = "give correct details"
    }
    
    let stored_username:string = localStorage['username']
    let stored_password:string = localStorage['password']

    let attempted_username:string = this.loginRef.value['username']
    let attempted_password:string = this.loginRef.value['password']

    if(attempted_username == stored_username && attempted_password == stored_password){
      console.log("Details entered are same")
      this.router.navigate(['../portfolio'])
    }

  }

  redirectRegistration(){
    this.router.navigate(['create'])
  }

}
