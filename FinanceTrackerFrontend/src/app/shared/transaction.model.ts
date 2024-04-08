import { Category } from "./category.model";

export class Transaction {
    id: number = 0;
    categoryId: number = 0
    category: Category | undefined;
    amount: number = 0;
    note: string = "";
    date: Date | undefined;
}
