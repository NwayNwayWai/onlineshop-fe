export interface IOptions {
  label: string;
  value: string;
}

export interface APIResponse<T> {
  status: number;
  data?: T;
}

export interface ErrorResponse {
  code: string;
  details: string;
  hint: string;
  message: string;
}

export interface MetaResponse {
  pagination: boolean;
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
}

export interface DataPaginatedResponse<T> {
  data: Array<T>;
  meta: MetaResponse;
}

export interface Option {
  label: string;
  value: string;
}
