import React from "react";

//hoc
import { userAuth, withUserLogin } from "lib/hoc";

//api services
import { fetcherCacheData, CacheAPIFetcher } from "lib/services";

//api routes
import { ApiRoutes } from "lib/constants";

//components
import { ChannelView } from "components/app";

function ChannelId() {
  return <ChannelView />;
}

export default withUserLogin(ChannelId);

export const getServerSideProps = userAuth();
