import React from "react";

//layout
import { AppLayout } from "components/layout";

export interface IServerSideData {
  serverData: any[];
}

interface IOptionsConfiguration {}

function withUserLogin(
  Component: React.ComponentType<IServerSideData>,
  options?: IOptionsConfiguration
) {
  return (props: IServerSideData) => {
    return (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );
  };
}

export default withUserLogin;
