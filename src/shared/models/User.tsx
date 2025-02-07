export type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";

export interface User {
  id: string;
  title: Title;
  firstName: string;
  lastName: string;
  picture: string;
}
