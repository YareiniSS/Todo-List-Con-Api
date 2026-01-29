import React from "react";

export default function Label(props) {
  return (
    <label
      className="block text-sm font-medium mb-1"
      style={{ color: "#002333" }}
      {...props}
    >
      {props.children}
    </label>
  );
}
