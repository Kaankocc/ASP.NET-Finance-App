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
  totalExpense: number = 0;
  totalIncome: number = 0;
  formData : Transaction = new Transaction();
  constructor(private http: HttpClient) { }
  

  GetListOfTransactions() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{
        this.list = res as Transaction[];
        let sumExpense = 0;
        let sumIncome = 0;

        this.list.forEach(transaction => {
          if (transaction.category && transaction.category.type) {
            if (transaction.category.type === 'Expense') {
              sumExpense += transaction.amount;
            } else if (transaction.category.type === 'Income') {
              sumIncome += transaction.amount;
            }
        }
        });
        this.totalExpense = sumExpense;
        this.totalIncome = sumIncome;
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
