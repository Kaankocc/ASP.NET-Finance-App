import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = environment.apiBaseUrl + "/Transaction"
  constructor(private http: HttpClient) { }
  

  GetListOfTransactions() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{
        console.log(res);
      },
      error: err => {console.log(err)}
    })
  }
}
