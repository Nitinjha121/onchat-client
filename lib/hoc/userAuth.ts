import { GetServerSideProps } from "next";

//configuration
import { setAxiosHeader } from "config/axios";
import { IServerSideData } from "./withUserLogin";

import { ApiRoutes } from "lib/constants";
import { APIFetcher } from "lib/services";

//types
import { ITokenDetailsCookie } from "types";

const userAuth =
  (callback?: GetServerSideProps): GetServerSideProps =>
  async (ctx) => {
    const tokenDetails = ctx.req.cookies.token_details;

    try {
      if (!tokenDetails) throw new Error();
      const tokenDetailsJson: ITokenDetailsCookie = JSON.parse(tokenDetails);
      setAxiosHeader(tokenDetailsJson.accessToken);
      // const data = await APIFetcher(ApiRoutes.VALIDATE_AUTH_TOKEN);
    } catch (err) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    if (callback) return callback(ctx);

    return {
      props: {},
    };
  };

export default userAuth;
