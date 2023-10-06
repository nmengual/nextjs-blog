"use client";

import { useState } from "react";

const FullView = ({ Component, children }) => {
  const [showFullView, setShowFullView] = useState(false);

  if (!showFullView) {
    return (
      <div onClick={() => setShowFullView(true)} className="cursor-pointer">
        {children}
      </div>
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-gray-50 py-3 border-t border-gray-300 shadow">
      <div
        className="absolute right-5 font-semibold text-red-600 cursor-pointer hover:text-red-700"
        onClick={() => setShowFullView(false)}
      >
        CLOSE
      </div>
      {Component}
    </div>
  );
};

export default FullView;
