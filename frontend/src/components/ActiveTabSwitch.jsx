import React from "react";
import { useChatStore } from "../store/useChatStore.js";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
      >
        Chats
      </button>
      <button
        className={`tab ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
