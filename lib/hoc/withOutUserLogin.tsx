import React from "react";

//layout
import { NonLoginUserLayout } from "components/layout";

interface IOptionsConfiguration {}

function withOutUserLogin<T>(
  Component: React.ComponentType<T>,
  options?: IOptionsConfiguration
) {
  return (props: T) => {
    return (
      <NonLoginUserLayout>
        <Component {...props} />
      </NonLoginUserLayout>
    );
  };
}

export default withOutUserLogin;
