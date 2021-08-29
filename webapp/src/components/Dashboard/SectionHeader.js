import React from "react";

const SectionHeader = ({ heading, children }) => {
  return (
    <div className="list-heading">
      <h4 className="list-heading-title">{heading}</h4>
      {children}
    </div>
  );
};

export default SectionHeader;
