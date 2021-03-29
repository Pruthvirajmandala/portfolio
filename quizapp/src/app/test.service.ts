import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { test } from './test.module';

@Injectable({
  providedIn: 'root'  //it is equal to provided in app.module.ts file
})
export class TestService {

  constructor(public http:HttpClient) { }

  loadtestDetails():Observable<test[]>{
    return this.http.get<test[]>("/assets/test.json");
  }
}