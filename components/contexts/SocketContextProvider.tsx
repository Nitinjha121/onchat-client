import React, { useContext } from "react";
import { io, Socket } from "socket.io-client";

// recoil
import { useRecoilValue } from "recoil";
import { tokenDetailsCookieAtom } from "components/recoil";

const socketContext = React.createContext<Socket | null>(null);

export function useSocketContext() {
  return useContext(socketContext);
}

export const SocketProvider = (props: React.PropsWithChildren) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const tokenDetails = useRecoilValue(tokenDetailsCookieAtom);

  React.useEffect(() => {
    if (!tokenDetails) return;

    const socketIo = io("http://localhost:8000/", {
      auth: {
        token: tokenDetails.accessToken,
      },
    });

    console.log("socketIoi", socketIo);

    setSocket(socketIo);

    return () => {
      socketIo.close();
    };
  }, [tokenDetails]);

  return (
    <socketContext.Provider value={socket}>
      {props.children}
    </socketContext.Provider>
  );
};
