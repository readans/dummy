export interface List<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
