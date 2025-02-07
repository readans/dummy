type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";
export interface CreateUser {
  title: Title;
  firstName: string;
  lastName: string;
  email: string;
}
