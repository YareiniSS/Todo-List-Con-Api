import React from "react";

export default function Input(props) {
  return (
    <input
      className="w-full p-2 rounded-md border focus:outline-none focus:ring-2"
      style={{
        borderColor: "#B4BEC9",
        focusRingColor: "#159A9C",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#159A9C";
        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(21, 154, 156, 0.2)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#B4BEC9";
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    />
  );
}
