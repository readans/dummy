export interface CreateUserDto {
  title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserDto {
  title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
  firstName: string;
  lastName: string;
}
