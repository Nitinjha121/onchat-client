import type { GetServerSideProps } from "next";

//configuration
import { setAxiosHeader } from "config/axios";

const withOutAuth =
  (callback?: GetServerSideProps): GetServerSideProps =>
  async (ctx) => {
    if (ctx.req.cookies.token_details) {
      setAxiosHeader(ctx.req.cookies.token_details);
      return {
        redirect: {
          destination: "/channels/@me",
          permanent: false,
        },
      };
    }

    if (callback) return callback(ctx);

    return {
      props: {},
    };
  };

export default withOutAuth;
