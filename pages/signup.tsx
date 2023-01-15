import React from "react";

//components
import { SignUpForm } from "components/pages";

//hoc
import { withOutAuth, withOutUserLogin } from "lib/hoc";

function SignUpPage() {
  return <SignUpForm />;
}

export default withOutUserLogin(SignUpPage);

export const getServerSideProps = withOutAuth();
