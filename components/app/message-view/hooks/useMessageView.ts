import React from "react";

//hooks
import { mutate } from "lib/hooks";

//services
import { ApiRoutes, MESSAGE_PER_PAGE } from "lib/constants";

//router
import { useRouter } from "next/router";

//types
import { IChatMessageNode, ICursorPaginationStructure } from "types";

//recoil
import { useGlobalContext, useSocketContext } from "components/contexts";
import { CacheAPIFetcher, isAxiosResponse } from "lib/services";
import { atomFamily, useRecoilState } from "recoil";

interface IMessagesChatWithDate {
  date: Date;
  messages: IChatMessageNode[];
}

const messagesChatWithDateAtomFamily = atomFamily<
  IMessagesChatWithDate[],
  string
>({
  key: "messagesChatWithDateAtomFamily",
  default: [],
});

const currentMessageChatsAtomFamily = atomFamily<
  ICursorPaginationStructure<IChatMessageNode[]> | null,
  string
>({
  key: "currentMessageChatsAtomFamily",
  default: null,
});

export const allFetchedMessagesStoreAtomFamily = atomFamily<
  Record<string, IChatMessageNode> | null,
  string
>({
  key: "allFetchedMessagesStoreAtomFamily",
  default: null,
});

export function useMessageView() {
  const router = useRouter();
  const directMessageId = router.query.userId as string;

  //recoil states
  const [messageChatsWithDate, setMessageChatsWithDate] = useRecoilState(
    messagesChatWithDateAtomFamily(directMessageId)
  );
  const [currentMessageChats, setCurrentMessageChats] = useRecoilState(
    currentMessageChatsAtomFamily(directMessageId)
  );
  const [allFetchedMessagesStore, setAllFetchedMessagesStore] = useRecoilState(
    allFetchedMessagesStoreAtomFamily(directMessageId)
  );

  //contexts
  const { globalDispatch } = useGlobalContext();
  const socket = useSocketContext();

  //refs
  const scrollableEleRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    socket?.on("dm-message", (data) => {
      console.log("running", data);
      mutate<ICursorPaginationStructure<IChatMessageNode[]>>(
        ApiRoutes.GET_USER_DIRECT_MESSAGES(
          String(directMessageId),
          MESSAGE_PER_PAGE
        )
      ).then((response) => {
        if (response.data) updateMessageChatsWithDate(response.data?.results);
      });
    });

    return () => {
      socket?.off("dm-message");
    };
  }, [socket, directMessageId]);

  React.useEffect(() => {
    const ele = document.getElementById("scroll-to-bottom");
    ele?.scrollIntoView({
      block: "end",
      inline: "start",
    });
  }, [messageChatsWithDate]);

  const fetchMoreMessages = React.useCallback(
    async (times: number) => {
      if ((times > 1 && currentMessageChats) || !directMessageId) return;

      console.log("times", times);

      const { data, error } = await CacheAPIFetcher<
        ICursorPaginationStructure<IChatMessageNode[]>
      >(
        ApiRoutes.GET_USER_DIRECT_MESSAGES(
          String(directMessageId),
          MESSAGE_PER_PAGE,
          currentMessageChats?.nextCursor || undefined
        )
      );

      if (data) {
        setCurrentMessageChats(data);
        updateMessageChatsWithDate(data.results);
      }
      if (error) {
        if (isAxiosResponse(error))
          globalDispatch({
            type: "ADD_TOAST_ALERT",
            payload: {
              kind: "warning",
              heading: "warning",
              description: error?.data?.message || "Something Went Wrong",
            },
          });
      }
    },
    [currentMessageChats, directMessageId] //eslint-disable-line
  );

  const updateMessageChatsWithDate = React.useCallback(
    (chatMessages: IChatMessageNode[]) => {
      const fetchedMessages: Record<string, IChatMessageNode> = {};
      chatMessages.forEach(
        (message) => (fetchedMessages[message._id] = message)
      );

      setAllFetchedMessagesStore((storeMessages) => ({
        ...storeMessages,
        ...fetchedMessages,
      }));
    },
    [setAllFetchedMessagesStore]
  );

  React.useEffect(() => {
    if (!allFetchedMessagesStore) return;
    const allFetchedMessagesArr = Object.values(allFetchedMessagesStore).sort(
      (a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;

        return 0;
      }
    );

    const data: IMessagesChatWithDate[] = [];
    let prevDate: Date | null = null;

    for (const message of allFetchedMessagesArr) {
      const currDate = new Date(message.createdAt);
      if (!prevDate || prevDate.toDateString() != currDate.toDateString()) {
        data.push({ date: currDate, messages: [message] });
        prevDate = currDate;
      } else {
        data.at(-1)?.messages.push(message);
      }
    }

    setMessageChatsWithDate(data);
  }, [allFetchedMessagesStore, setMessageChatsWithDate]);

  return {
    messageChatsWithDate,
    messageChats: currentMessageChats,
    fetchMoreMessages,
    scrollableEleRef,
  };
}
