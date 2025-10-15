import React from "react";

function MessageLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className={`chat ${
            idx % 2 === 0 ? "chat-start" : "chat-end"
          } animate-pulse`}
        >
          <div className={`chat-bubble bg-slate-800 text-white w-32`} />
        </div>
      ))}
    </div>
  );
}

export default MessageLoadingSkeleton;
