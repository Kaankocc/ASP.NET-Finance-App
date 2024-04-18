import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Transaction } from './transaction.model';
import { transition } from '@angular/animations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = environment.apiBaseUrl + "/Transaction"
  list:Transaction[] = [];
  totalAmount: number = 0;
  formData : Transaction = new Transaction();
  constructor(private http: HttpClient) { }
  

  GetListOfTransactions() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{
        this.list = res as Transaction[];
        let sum = 0;
        this.list.forEach(transaction => {
          sum += transaction.amount;
        });
        this.totalAmount= sum;
      },
      error: err => {console.log(err)}
    });


  }

  PostTransaction():  Observable<any> {
   return this.http.post(this.url, this.formData);
  }

  getTotalAmount(): number {
    let totalAmount = 0;
    for (const transaction of this.list) {
      totalAmount += transaction.amount;
    }
    return totalAmount;
  }

}
