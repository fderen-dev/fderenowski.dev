import { FetchReturnType } from "models/misc";
import { TypeTools } from "utils/TypeTools";

interface WithFetchingDataProps<ComponentProps, DataType>
  extends Omit<FetchReturnType<DataType>, "data"> {
  Component: React.FunctionComponent<
    ComponentProps & Pick<FetchReturnType<DataType>, "data">
  >;
  Loader?: React.ReactElement;
  NoResults?: React.ReactElement;
}

export const withFetchingData = <ComponentProps, DataType>({
  Component,
  Loader,
  NoResults,
  isFetching,
  error,
}: WithFetchingDataProps<ComponentProps, DataType>) => {
  const ComponentWithFetchingData = ({
    data,
    ...rest
  }: FetchReturnType<DataType>) => {
    if (isFetching) {
      return Loader ?? <p>Loading...</p>;
    }

    if (TypeTools.isNonEmptyString(error)) {
      return <p>{error}</p>;
    }

    if (TypeTools.isNullOrUndefined(data) || !TypeTools.isNonEmptyArray(data)) {
      return NoResults ?? <p>No results</p>;
    }

    // @ts-ignore
    return <Component data={data} {...rest} />;
  };

  return ComponentWithFetchingData;
};
