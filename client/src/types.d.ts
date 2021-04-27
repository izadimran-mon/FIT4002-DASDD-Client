interface Ad{
    bot: string;
    dateTime: Date;
    file: string;
    headline: string;
    category: CategoryData[];
    seenOn: string;
}

interface CategoryData{
    name: string;
    selection: boolean;
}