import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TransactionService]
})
export class HomeComponent implements OnInit {
  
  constructor(public service: TransactionService) {

  }

  modalActive: boolean = false;

  ngOnInit(): void {
    this.service.GetListOfTransactions();
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }
}
