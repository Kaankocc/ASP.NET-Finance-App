import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.apiBaseUrl + "/Category"
  list:Category[] = [];
  constructor(private http: HttpClient) { }

  GetListOfCategories() {
    this.http.get(this.url)
    .subscribe({
      next: res=>{
        this.list = res as Category[];
      },
      error: err => {console.log(err)}
    });

  }
}
