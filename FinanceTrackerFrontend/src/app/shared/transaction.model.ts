import { Category } from "./category.model";

export class Transaction {
    id: number;
    categoryId: number;
    category: Category | null;
    amount: number;
    note: string;
    date: Date;

    constructor(id: number, categoryId: number, category: Category | null, amount: number, note: string, date: Date) {
        this.id = id;
        this.categoryId = categoryId;
        this.category = category;
        this.amount = amount;
        this.note = note;
        this.date = date;
    }
}
