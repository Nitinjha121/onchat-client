import React from "react";

//components
import { SignInForm } from "components/pages";

//hoc
import { withOutAuth, withOutUserLogin } from "lib/hoc";

function SignInPage() {
  return <SignInForm />;
}

export default withOutUserLogin(SignInPage);

export const getServerSideProps = withOutAuth();
