import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems: any | undefined;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  pages: number[] | undefined;

  totalPages = 0;


  constructor() {
  

  }

  ngOnInit(): void {
    if(this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }


  pageClicked(page: number) {
    this.onClick.emit(page);
  }

  

}
