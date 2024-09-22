import React from "react";

const FilterButton = ({ title, modeName, onClick, activeMode }) => {
  return (
    <span
      className={`${
        modeName === activeMode ? "border-blue-500 text-blue-500" : ""
      } px-4 py-1 text-gray-500 border-gray-500 rounded-full border-2 m-2 transition-all hover:text-purple-500 hover:border-purple-500 cursor-pointer`}
      onClick={onClick}
    >
      {title}
    </span>
  );
};

export default FilterButton;
