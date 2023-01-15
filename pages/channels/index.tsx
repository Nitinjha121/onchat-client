import type { GetStaticProps } from "next";

function index() {
  return null;
}

export default index;

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "/channels/@me",
      permanent: true,
    },
  };
};
