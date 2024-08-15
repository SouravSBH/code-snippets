import { getJwt, getSocket } from "api-routes/ApiRoutes";
import {
  SocketEventType,
  SocketStatus,
} from "lib/constants/enum/SocketEventType";
import UserType from "lib/constants/enum/UserType";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const socket = useRef(null);
  const [socketStatus, setSocketStatus] = useState(SocketStatus.disconnected);
  const { data: session } = useSession();

  const onConnect = async () => {
    setSocketStatus(SocketStatus.connected);
  };

  const connect = async () => {
    const res = await getJwt();
    const jwt = res?.data?.result;
    socket.current = io("/", {
      transports: ["websocket"],
      auth: {
        token: jwt,
        userType: UserType.USER,
      },
    });
    socket.current.on(SocketEventType.server.CONNECT, onConnect);
  };

  const disconnect = () => {
    socket.current?.off(SocketEventType.server.CONNECT, onConnect);
    setSocketStatus(SocketStatus.disconnected);
    socket.current?.disconnect();
  };

  useEffect(async () => {
    if (session?.user?.id === undefined) {
      disconnect();
      return;
    }
    await connect();
    return () => {
      disconnect();
    };
  }, [session?.user?.id]);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.onbeforeunload = () => {
        socket.current?.close();
      };
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        socketStatus,
        setSocketStatus,
        connect,
        disconnect,
        socketUserId: session?.user?.id,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
