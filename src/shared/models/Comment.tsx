import { UserPreview } from "./User";

export interface CommentCreate {
  message: string;
  owner: string;
  post: string;
}

export interface Comment {
  id: string;
  message: string;
  owner: UserPreview;
  post: string;
  publishDate: string;
}
