import { FetchReturnType } from "models/misc";
import { TypeTools } from "utils/TypeTools";

interface WithFetchingDataProps<Data> extends FetchReturnType<Data> {
  Loader?: JSX.Element;
  NoResults?: JSX.Element;
}

export const withFetchingData = <Props extends object, Data>(
  Component: React.FunctionComponent<Props>
): React.FunctionComponent<Props & WithFetchingDataProps<Data>> =>
  function SomeName({
    isFetching,
    error,
    data,
    Loader,
    NoResults,
    ...props
  }: WithFetchingDataProps<Data>) {
    if (isFetching) {
      return Loader ?? <p>Loading...</p>;
    }

    if (TypeTools.isNonEmptyString(error)) {
      return <p>{error}</p>;
    }

    if (TypeTools.isNullOrUndefined(data) || !TypeTools.isNonEmptyArray(data)) {
      return NoResults ?? <p>No results</p>;
    }

    return <Component data={data} {...(props as Props)} />;
  };
