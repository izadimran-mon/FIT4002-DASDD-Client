interface Ad{
    bot: string;
    dateTime: Date;
    file: string;
    headline: string;
    category: CategoryData[];
}

interface CategoryData{
    name: string;
    selection: boolean;
}