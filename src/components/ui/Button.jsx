import React from "react";

export default function Button(props) {
  const { className = "", ...restProps } = props;
  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        backgroundColor: "var(--color-secondary, #159A9C)",
        color: "white",
      }}
      onMouseEnter={(e) => {
        if (!e.currentTarget.disabled) {
          e.currentTarget.style.backgroundColor = "#002333";
        }
      }}
      onMouseLeave={(e) => {
        if (!e.currentTarget.disabled) {
          e.currentTarget.style.backgroundColor =
            "var(--color-secondary, #159A9C)";
        }
      }}
      {...restProps}
    >
      {props.children}
    </button>
  );
}
