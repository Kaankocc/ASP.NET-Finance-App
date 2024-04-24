import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from '../shared/transaction.service';
import { CategoryService } from '../shared/category.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Category } from '../shared/category.model';
import { Transaction } from '../shared/transaction.model';
import ApexCharts from 'apexcharts'
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { PaginationComponent } from "../pagination/pagination.component";



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [TransactionService, CategoryService],
    imports: [CommonModule, HttpClientModule, FormsModule, PieChartComponent, PaginationComponent]
})
export class HomeComponent implements OnInit {
  itemsPerPage = 5;
  currentPage = 1;

  TransactionData = this.transactionService.list;
  CategoryData = this.categoryService.list;


  // For Transaction Object
  selectedCategory: string = ""; 
  amount: number = 0;
  note: string = '';
  date: string = '';

  // For Category Object
  title: string = "";
  icon: string = "";
  type: string = "";

  // For Editing Category Object
  currentCategory: Category | undefined;
  IsEditModeCategory: boolean = false; // Flag to track if in edit mode

    // For Editing Transaction Object
  currentTransaction: Transaction | undefined;
  IsEditModeTransaction: boolean = false; // Flag to track if in edit mode


  showingTransactions: boolean = true;
  showingCategories: boolean = false;





  constructor(public transactionService: TransactionService,
    public categoryService: CategoryService ) {
  }

  transactionModalActive: boolean = false;
  categoryModalActive: boolean = false;
  noteModelActive: boolean =  false;
  noteContent: string = "";


  ngOnInit(): void {  
    
    this.transactionService.GetListOfTransactions();

  }

  get paginatedTransactionData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.transactionService.list.slice(start, end);
  }

  get paginatedCategorynData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.categoryService.list.slice(start, end);
  }


  changePage(page: number) {
    this.currentPage = page;
  }

  submitTransactionForm(): void {
    this.transactionService.formData.amount = this.amount;
    this.transactionService.formData.categoryId = +this.selectedCategory;
    this.transactionService.formData.date = this.parseDateString(this.date);
    this.transactionService.formData.note = this.note;

    this.transactionService.PostTransaction().subscribe({
    next: () => {
      // Close the modal after successful post
      this.cancelTransactionButton();
      // Reload the page to refresh the list
      this.showingTransactions = true;
        this.showTransactions();
    },
    error: (error) => {
      // Handle errors if necessary
      console.error('Error posting transaction:', error);
    }
  });
    
  }

  editCategory(id: number): void {
    this.IsEditModeCategory = true;
    this.categoryService.GetSingleCategory(id).subscribe({
      next: res=>{
        this.currentCategory = res as Category;
        this.title = this.currentCategory?.title ?? '';
        this.icon = this.currentCategory?.icon ?? '';
        this.type = this.currentCategory?.type ?? '';
        console.log(res);
      },
      error: err => {console.log(err)}
    });

    

    this.OpenCategoryModal();

  }

  submitCategoryForm(): void {
    if(this.IsEditModeCategory == false) {
    this.categoryService.formData.title = this.title;
    this.categoryService.formData.icon = this.icon;
    this.categoryService.formData.type = this.type;

    console.log(this.categoryService.formData);

    this.categoryService.PostCategory().subscribe({
      next: () => {
        // Close the modal after successful post
        this.CloseCategoryModel();
        // Reload the page to refresh the list
        this.showCategories();
      },
      error: (error) => {
        // Handle errors if necessary
        console.error('Error posting category:', error);
      }
    });

    } else {
      if(this.currentCategory) {
        this.categoryService.formData.title = this.title;
        this.categoryService.formData.icon = this.icon;
        this.categoryService.formData.type = this.type;
  
        this.categoryService.PutCategory(this.currentCategory.id).subscribe({
          next: () => { 
            this.cancelCategoryButton();
            this.showCategories();
          },
          error: (error) => {
            console.error("Error updating category:", error);
          }
        })
      }
      
    }
    
  }

  deleteCategory(id: number): void {
    this.categoryService.DeleteCategory(id).subscribe({
      next: () => {
        // Reload the page to refresh the list
        this.showingCategories = true;
        this.showCategories();
      },
      error: (error) => {
        // Handle errors if necessary
        console.error('Error deleting category:', error);
      }
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.DeleteTransaction(id).subscribe({
      next: () => {
        // Reload the page to refresh the list
        this.showingTransactions = true;
        this.showTransactions();
      },
      error: (error) => {
        // Handle errors if necessary
        console.error('Error deleting Category:', error);
      }
    });
  }

  editTransaction(id: number): void {
    this.IsEditModeTransaction = true;
    this.transactionService.GetSingleTransaction(id).subscribe({
      next: res=>{
        this.currentTransaction = res as Transaction;
        this.amount = this.currentTransaction?.amount ?? 0;
        this.selectedCategory = (this.currentTransaction?.categoryId ?? 0).toString();
        this.note = this.currentTransaction?.note ?? '';
        this.note = this.currentTransaction?.note ?? '';
        this.date = this.convertToFormattedString(this.currentTransaction?.date ?? '');
        console.log(res);
      },
      error: err => {console.log(err)}
    });

    

    this.OpenTransactionModel();

  }

  showTransactions() {
    this.transactionService.GetListOfTransactions();
    this.showingTransactions = true;
    this.showingCategories = false;
  }

  showCategories() {
    this.categoryService.GetListOfCategories();
    this.showingTransactions = false;
    this.showingCategories = true;
  }

  cancelTransactionButton() {
    this.selectedCategory  = ""; 
    this.amount = 0;
    this.note = '';
    this.date = '';
    this.transactionModalActive = false;
  }

  OpenTransactionModel() {
    this.transactionModalActive = true;
    this.categoryService.GetListOfCategories();
  }

  closeNodeModel() {
    this.noteModelActive = false;
  }



  OpenCategoryModal() {
    this.categoryModalActive = true;
  }


  CloseCategoryModel() {
    this.IsEditModeCategory = false;
    this.categoryModalActive = false;
    this.transactionModalActive = false;

  }

  showNoteModal(note: string) {
    this.noteModelActive = true;
    this.noteContent = note; // Set the note content
  }

  cancelCategoryButton() {
    this.IsEditModeCategory = false;
    this.title  = ""; 
    this.icon = "";
    this.type = '';
    this.categoryModalActive = false;
    this.transactionModalActive = false;
  }
  
convertToFormattedString(dateTime: Date | string | undefined): string {
    // Check if dateTime is a valid Date object or string
    if (dateTime instanceof Date) {
        // Convert Date to string with desired format
        const formattedDate: string = dateTime.toLocaleDateString('en-US'); // Using 'en-GB' locale for dd/MM/yyyy format
        return formattedDate;
    } else if (typeof dateTime === 'string') {
        // Parse string to Date object
        const parsedDate: Date = new Date(dateTime);
        if (!isNaN(parsedDate.getTime())) {
            // Convert parsed Date to string with desired format
            const formattedDate: string = parsedDate.toLocaleDateString('en-US');
            return formattedDate;
        }
    }

    // If dateTime is neither a valid Date object nor a valid string, return "Invalid date"
    return "Invalid date";
}

parseDateString(date: string): Date | undefined {
  const dateParts: string[] = date.split("-");
        
        if (dateParts.length === 3) {
            const year: number = parseInt(dateParts[0]);
            const month: number = parseInt(dateParts[1]) - 1;
            const day: number = parseInt(dateParts[2]);
            
            return new Date(year, month, day);
        }
        
        return undefined;
}


}




