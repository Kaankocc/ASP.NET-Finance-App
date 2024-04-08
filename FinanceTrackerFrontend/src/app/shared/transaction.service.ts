import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Transaction } from './transaction.model';
import { transition } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = environment.apiBaseUrl + "/Transaction"
  list:Transaction[] = [];
  formData : Transaction = new Transaction();
  constructor(private http: HttpClient) { }
  

  GetListOfTransactions() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{
        this.list = res as Transaction[];
      },
      error: err => {console.log(err)}
    });

  }

  PostTransaction() {
   return this.http.post(this.url, this.formData)
   .subscribe({
    next: res => {
      console.log(res)
    },
    error: err => { console.log(err) }
   }) 
  }
}
