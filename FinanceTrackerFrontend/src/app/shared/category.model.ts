export class Category {
    id: number;
    title: string;
    icon: string;
    type: string;

    constructor(id: number, title: string, icon: string, type: string) {
        this.id = id;
        this.title = title;
        this.icon = icon;
        this.type = type;
    }
}
