import React from "react";

const Announcement = () => {
  return (
    <div
      role="alert"
      className="w-full bg-blue-400 text-black text-center py-2 font-semibold"
    >
      ⚠️ This version is still under development. Some features may not work as
      expected.
    </div>
  );
};

export default Announcement;
