import { AxiosResponse } from "axios";

export type Optional<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
} & {
  [P in K]?: T[P];
};

export type Permanent<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]?: T[P];
} & {
  [P in K]: T[P];
};

export interface IPaginationStructure<T> {
  count: number;
  isNextPage: boolean;
  isPrevPage: boolean;
  results: T;
  totalPages: number;
}

export interface ICursorPaginationStructure<T> {
  count: number;
  isNextPage: boolean;
  isPrevPage: boolean;
  nextCursor: string | null;
  results: T;
  totalPages: number;
}

export type IAxiosErrorResponse = AxiosResponse<
  { message: string } | undefined
>;
