interface Ad {
  adLink: string;
  botId: string;
  createdAt: string;
  headline: string;
  html: string;
  id: string;
  image: string;
  loggedIn: boolean;
  seenOn: string;
  tags: Tag[]; // TODO: define tag interface
  bot: Bot;
}

interface Bot {
  dob: Date;
  fName: string;
  gender: string;
  id: string;
  lName: string;
  locLat: number;
  locLong: number;
  otherTermsCategory: number;
  password: string;
  politicalRanking: number;
  type: string;
  username: string;
}

interface Tag {
  id: number;
  name: string;
}

interface CategoryData {
  name: string;
  selection: boolean;
}
