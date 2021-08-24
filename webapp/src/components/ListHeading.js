import React from "react";

const ListHeading = ({ heading, handleSort }) => {
  return (
    <div className="list-heading">
      <h4 className="list-heading-title">{heading}</h4>
      <div>
        <button
          type="button"
          className="btn btn-outline-warning mx-3 pe-auto"
          onClick={handleSort}
        >
          Sort by Rating
        </button>
        <button type="button" className="btn btn-outline-warning">
          Filter
        </button>
      </div>
    </div>
  );
};

export default ListHeading;
