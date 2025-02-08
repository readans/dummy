import { UserPreview } from "./User";

export interface PostCreate {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string;
}

export interface PostPreview {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: UserPreview;
}

export interface Post extends PostPreview {
  link: string;
}
