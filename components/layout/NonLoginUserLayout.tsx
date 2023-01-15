import React from "react";

//components
import { Header } from "components/marketing-view";
import { Container } from "components/ui";

interface IProps {
  children: React.ReactNode;
}

function NonLoginUserLayout(props: IProps) {
  return (
    <main className="flex flex-col min-h-screen dark:bg-gray-800 dark:text-white">
      <Header />

      <Container className="flex-1">{props.children}</Container>
    </main>
  );
}

export default NonLoginUserLayout;
