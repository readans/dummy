type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";

export interface UpdateUser {
  title: Title;
  firstName: string;
  lastName: string;
}
