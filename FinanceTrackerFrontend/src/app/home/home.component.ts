import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from '../shared/transaction.service';
import { CategoryService } from '../shared/category.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Category } from '../shared/category.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TransactionService, CategoryService]
})
export class HomeComponent implements OnInit {

  // For Transaction Object
  selectedCategory: string = ""; 
  amount: number = 0;
  note: string = '';
  date: string = '';

  // For Category Object
  title: string = "";
  icon: string = "";
  type: string = "";


  showingTransactions: boolean = true;
  showingCategories: boolean = false;



  constructor(public transactionService: TransactionService,
    public categoryService: CategoryService ) {
  }

  transactionModalActive: boolean = false;
  categoryModalActive: boolean = false;


  ngOnInit(): void {  
    this.transactionService.GetListOfTransactions();
  }

  submitTransactionForm(): void {
    this.transactionService.formData.amount = this.amount;
    this.transactionService.formData.categoryId = +this.selectedCategory;
    this.transactionService.formData.date = this.parseDateString(this.date);
    this.transactionService.formData.note = this.note;

    this.transactionService.PostTransaction().subscribe({
    next: () => {
      // Close the modal after successful post
      this.CloseTransactionModel();
      // Reload the page to refresh the list
      location.reload();
    },
    error: (error) => {
      // Handle errors if necessary
      console.error('Error posting transaction:', error);
    }
  });
    
  }

  submitCategoryForm(): void {
    this.categoryService.formData.title = this.title;
    this.categoryService.formData.icon = this.icon;
    this.categoryService.formData.type = this.type;

    console.log(this.categoryService.formData);

    this.categoryService.PostCategory().subscribe(() => {
      // Close the modal after successful post
      this.CloseCategoryModel();
      // Reload the page to refresh the list
      this.showCategories();
    }, error => {
      // Handle errors if necessary
      console.error('Error posting Category:', error);
    });
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

  showTransactions() {
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

  CloseTransactionModel() {
    this.transactionModalActive = false;
    
  }

  OpenCategoryModal() {
    this.categoryModalActive = true;
  }


  CloseCategoryModel() {
    this.categoryModalActive = false;
  }

  cancelCategoryButton() {
    this.title  = ""; 
    this.icon = "";
    this.type = '';
    this.categoryModalActive = false;
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




