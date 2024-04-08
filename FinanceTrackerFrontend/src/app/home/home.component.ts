import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from '../shared/transaction.service';
import { CategoryService } from '../shared/category.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Transaction } from '../shared/transaction.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TransactionService, CategoryService]
})
export class HomeComponent implements OnInit {

  selectedCategory: string = ""; 
  amount: number = 0;
  note: string = '';
  date: string = '';


  constructor(public transactionService: TransactionService,
    public categoryService: CategoryService ) {
  }

  modalActive: boolean = false;

  ngOnInit(): void {
    this.transactionService.GetListOfTransactions();
  }

  submitForm(): void {
    console.log("submitted");
  }

  cancelButton() {
    this.selectedCategory  = ""; 
    this.amount = 0;
    this.note = '';
    this.date = '';
    this.modalActive = false;
  }

  OpenModal() {
    this.modalActive = true;
    this.categoryService.GetListOfCategories();
  }

  CloseModal() {
    this.modalActive = false;
    console.log(this.selectedCategory);
    console.log(this.amount);
    console.log(this.note);
    console.log(this.date);
    
  }
}
