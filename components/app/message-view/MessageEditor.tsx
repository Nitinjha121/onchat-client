import React from "react";

//heroicons
import { PlusCircleIcon } from "@heroicons/react/24/solid";

//services
import { APIPusher } from "lib/services";
import { ApiRoutes } from "lib/constants";

//next router
import { useRouter } from "next/router";

//recoil
import { useRecoilValue, useSetRecoilState } from "recoil";

//context
import { useSocketContext } from "components/contexts";
import { mutate } from "lib/hooks";
import { selectedDMUserDataAtom } from "components/recoil";
import { allFetchedMessagesStoreAtomFamily } from "./hooks";
import { IChatMessageNode } from "types";

function MessageEditor() {
  const router = useRouter();
  const directMessageId = router.query.userId as string;

  //context
  const socket = useSocketContext();

  //recoil state
  const selectedUser = useRecoilValue(selectedDMUserDataAtom);
  const setAllFetchedMessagesStore = useSetRecoilState(
    allFetchedMessagesStoreAtomFamily(directMessageId)
  );

  const [messageValue, setMessageValue] = React.useState("");

  const messageRowLength = messageValue.split("\n").length;

  const messageHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessageValue(value);
  };

  const messageKeyDownHandler = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const event = new KeyboardEvent(e.type);
    e.target.dispatchEvent(event);

    if (e.key == "Enter") {
      e.preventDefault();
      console.log("socket", socket);
      socket?.emit(
        "dm-message",
        {
          directMessageId: directMessageId,
          userId: selectedUser?._id,
          messageNode: {
            content: e.currentTarget.value,
            parentId: directMessageId,
          },
        },
        (res: { success: boolean; data?: IChatMessageNode }) => {
          if (res.data)
            setAllFetchedMessagesStore((storedMessages) => ({
              ...storedMessages,
              [res.data!._id]: res.data!,
            }));
          console.log(res);
        }
      );
      setMessageValue("");
      //   const data = await APIPusher(
      //     ApiRoutes.SEND_DIRECT_MESSAGE_TO_USER(userId, directMessageId!),
      //     {}
      //   );
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded text-slate-500 dark:text-slate-300 bg-gray-100 dark:bg-gray-500">
      <PlusCircleIcon className="w-6 h-6 cursor-pointer hover:text-slate-600 dark:hover:text-slate-100" />
      <textarea
        rows={messageRowLength < 6 ? messageRowLength : 6}
        value={messageValue}
        onChange={messageHandler}
        onKeyDown={messageKeyDownHandler}
        className="py-2 outline-none resize-none bg-inherit text-sm w-full"
        placeholder="Write A Message..."
      />
    </div>
  );
}

export default MessageEditor;
