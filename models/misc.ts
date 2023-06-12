export interface FetchReturnType<Data> {
  data: Data | null;
  isFetching: boolean;
  error: string | null;
}
