import React from "react";

//components
import { Button, InfiniteScroll } from "components/ui";
import MessageEditor from "./MessageEditor";

//recoil
import { selectedDMUserDataAtom } from "components/recoil";
import { useRecoilValue } from "recoil";
import { useMessageView } from "./hooks";

function MessageView() {
  const selectedDMUser = useRecoilValue(selectedDMUserDataAtom);
  const {
    messageChatsWithDate,
    messageChats,
    fetchMoreMessages,
    scrollableEleRef,
  } = useMessageView();

  return (
    <section className="flex-1 flex flex-col justify-between">
      <div className="overflow-y-auto pt-8 px-4 h-full">
        {messageChats?.isNextPage == false && (
          <section className="space-y-4 pt-8">
            <div className="bg-blue-500 rounded-full w-16 h-16"></div>

            <h2 className="text-xl font-medium">{selectedDMUser?.username}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is the beginning of your direct message history with @
              {selectedDMUser?.username}
            </p>

            <div className="flex items-center gap-3">
              <p className="text-gray-600 dark:text-gray-300">
                No servers in common
              </p>
              <span className="bg-gray-400 rounded-full w-1.5 h-1.5"></span>

              <Button className="py-1">Add Friend</Button>
              <Button className="bg-gray-500 hover:bg-gray-600 py-1">
                Block
              </Button>
            </div>
          </section>
        )}

        <section className="mt-10 space-y-7">
          <InfiniteScroll
            scrollType="top"
            hasMore={messageChats?.isNextPage != false}
            loader={Array.from({ length: 2 }).map((_, i) => (
              <MessageViewShimmer key={i} />
            ))}
            loadMore={fetchMoreMessages}
            scrollableEle={scrollableEleRef.current}
          >
            <div ref={scrollableEleRef}></div>
            {messageChatsWithDate.map((messagesWithDate, i) => (
              <div key={i} className="space-y-5 py-3">
                <div className="relative">
                  <div className="h-0.5 bg-gray-300 rounded dark:bg-gray-500"></div>
                  <div className="rounded-2xl px-4 py-1 absolute text-sm left-1/2 -translate-x-1/2 -translate-y-1/2 -top-1/2 shadow bg-gray-100 dark:bg-gray-500">
                    {new Date(messagesWithDate.date).toLocaleDateString(
                      "en-us",
                      {
                        month: "long",
                        year: "numeric",
                        day: "2-digit",
                      }
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  {messagesWithDate.messages.map((message, j) => (
                    <div key={i + j} className="flex gap-4">
                      <div className="bg-blue-500 rounded-full w-10 h-10 shrink-0">
                        {" "}
                      </div>
                      <div className="">
                        <div className="space-x-2">
                          <span>{message.sender.username}</span>

                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {new Date(message.createdAt).toLocaleDateString(
                              "en-us",
                              {
                                month: "short",
                                year: "numeric",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>

                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </section>

        <div id="scroll-to-bottom"></div>
      </div>

      <div className="p-4">
        <MessageEditor />
      </div>
    </section>
  );
}

export default MessageView;

const MessageViewShimmer = () => {
  return (
    <div className="space-y-5 py-5 animate-pulse">
      <div className="relative">
        <div className="h-0.5 bg-gray-400 bg-opacity-60 rounded dark:bg-gray-500"></div>
        <div className="rounded-2xl px-4 py-1 absolute text-sm left-1/2 -translate-x-1/2 -translate-y-1/2 -top-1/2 shadow bg-gray-100 dark:bg-gray-500 h-6 w-32"></div>
      </div>

      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, j) => (
          <div key={j} className="flex gap-4">
            <div className="bg-gray-400 bg-opacity-60 dark:bg-gray-700 rounded-full w-10 h-10"></div>
            <div className="space-y-2 relative top-2">
              <p className="h-3 w-56 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <p className="h-3 w-48 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <div className="flex gap-3">
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>
              <div className="flex gap-3">
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-24 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>

              <p className="h-3 w-44 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              <div className="flex gap-4">
                <p className="h-3 w-28 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
                <p className="h-3 w-28 rounded-lg bg-gray-400 bg-opacity-60 dark:bg-gray-500"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
