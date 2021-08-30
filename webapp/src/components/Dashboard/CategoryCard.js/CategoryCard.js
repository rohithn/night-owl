import React from "react";

const CategoryCard = ({ item, count, onSelect }) => {
  return (
    <div
      className="book d-flex justify-content-between align-items-center"
      onClick={onSelect}
    >
      <div>
        <strong>{item}</strong> ({count})
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        className="bi bi-chevron-right text-muted"
        viewBox="0 0 16 16"
        fill="#6c757d"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  );
};

export default CategoryCard;
