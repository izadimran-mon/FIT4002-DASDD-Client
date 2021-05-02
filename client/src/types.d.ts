interface Ad{
    bot: string;
    dateTime: Date;
    file: string;
    headline: string;
    category: CategoryData[];
    seenOn: string;
}

interface AdData{
    adLink: string;
    botId: string;
    createdAt: string;
    headline: string;
    html: string;
    id: string;
    image: string;
    loggedIn: boolean;
    seenOn: string;
}

interface CategoryData{
    name: string;
    selection: boolean;
}