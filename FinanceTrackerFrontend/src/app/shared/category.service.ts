import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Category } from './category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.apiBaseUrl + "/Category"
  list:Category[] = [];
  formData : Category = new Category();
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


  PostCategory():  Observable<any> {
    return this.http.post(this.url, this.formData);
   }

  DeleteCategory(id: number) {
    return this.http.delete(this.url + "/" + id)
  }
}
