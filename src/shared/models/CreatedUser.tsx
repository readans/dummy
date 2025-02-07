type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";
export interface CreatedUser {
  id: string;
  title: Title;
  firstName: string;
  lastName: string;
  email: string;
  registerDate: string;
  updatedDate: string;
}
