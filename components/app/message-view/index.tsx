import React from "react";

//components
import MessageHeaderView from "./MessageHeaderView";
import MessageRightSidebar from "./MessageRightSidebar";
import MessageView from "./MessageView";

function Index() {
  return (
    <main className="h-full flex flex-col">
      <MessageHeaderView />

      <section className="flex flex-1 h-0">
        <MessageView />
        <MessageRightSidebar />
      </section>
    </main>
  );
}

export default Index;
