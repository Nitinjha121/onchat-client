import React from "react";

//hoc
import { userAuth, withUserLogin } from "lib/hoc";

//api services
import { fetcherCacheData, CacheAPIFetcher } from "lib/services";

//api routes
import { ApiRoutes } from "lib/constants";

//components
import { MessageView } from "components/app";

function DirectMessageView() {
  return <MessageView />;
}
export default withUserLogin(DirectMessageView);
