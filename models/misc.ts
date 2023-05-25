export interface FetchReturnType<Data> {
  data: Data;
  isFetching: boolean;
  error: string | null;
}
