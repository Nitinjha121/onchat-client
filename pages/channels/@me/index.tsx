import React from "react";

//hoc
import { userAuth, withUserLogin } from "lib/hoc";

//api services
import { fetcherCacheData, CacheAPIFetcher } from "lib/services";

//api routes
import { ApiRoutes } from "lib/constants";

//components
import { FriendsView } from "components/app";

function UserDashboard() {
  return <FriendsView />;
}

export default withUserLogin(UserDashboard);

export const getServerSideProps = userAuth(async (ctx) => {
  const data = await CacheAPIFetcher(ApiRoutes.GET_ALL_USER_FRIENDS);

  // console.log("data", data);
  return { props: {} };
});
