export interface CommunityProp {
  content: string;
  date: string;
  image: string;
  like: number;
  likedUser: string[];
  subject: string;
  title: string;
  userId: {
    user_nickname: string;
    _id: string;
  };
  _id: string;
}
