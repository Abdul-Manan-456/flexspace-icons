// src/components/Icon.jsx
import React from "react";

const Icon = ({ name, size = "24px", color = "currentColor", ...props }) => {
  return (
    <span
      className={`flexspace-icon icon-${name}`}
      style={{
        fontSize: size,
        color: color,
        display: "inline-block",
      }}
      {...props}
    />
  );
};

export default Icon;
