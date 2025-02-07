type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";
export interface UpdatedUser {
  id: string;
  title: Title;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  email: string;
  phone: string;
  registerDate: string;
  updatedDate: string;
}
