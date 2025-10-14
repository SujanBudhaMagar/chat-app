import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logOut } = useAuthStore();
  return (
    <div className="relative z-10">
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default ChatPage;
