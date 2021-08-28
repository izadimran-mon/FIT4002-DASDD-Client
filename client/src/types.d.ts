interface BaseAd {
  adLink: string;
  botId: string;
  createdAt: string;
  id: string;
  image: string;
  tags: Tag[]; // TODO: define tag interface
}

interface GoogleAd extends BaseAd {
  headline: string;
  html: string;
  loggedIn: boolean;
  bot: GoogleBot;
  seenOn: string;
}

interface TwitterAd extends BaseAd {
  promoterHandle: string;
  content: string;
  bot: TwitterBot;
}

type Ad = GoogleAd | TwitterAd;

interface BaseBot {
  id: string;
  username: string;
  politicalRanking: number;
}

interface GoogleBot extends BaseBot {
  dob: Date;
  fName: string;
  gender: string;
  lName: string;
  locLat: number;
  locLong: number;
  otherTermsCategory: number;
  password: string;
  type: string;
}

interface TwitterBot extends BaseBot {}

type Bot = GoogleBot | TwitterBot;

interface Tag {
  id: number;
  name: string;
}

interface CategoryData {
  name: string;
  selection: boolean;
}
