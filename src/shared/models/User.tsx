export interface UserPreview {
  id: string;
  title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface UserFull extends UserPreview {
  gender: "male" | "female" | "other" | "";
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  location: Location;
}
