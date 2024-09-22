import React, { useState } from "react";
import Cross from "../assets/Cross";
import CloseIcon from "../assets/cross.svg?react"; // Импорт SVG как компонента
import EditIcon from "../assets/edit.svg?react";
import AcceptIcon from "../assets/accept.svg?react";

const Task = ({
  id,
  title,
  isChecked,
  handleCheck,
  handleDelete,
  handleEditTitle,
}) => {
  const handleClick = () => {
    handleCheck(id);
  };
  const handleDel = () => {
    handleDelete(id);
  };
  const handleEdit = () => {  
    setIsEdid(true);
  };
  const handleEditChange = (event) => {
    setEdidTitle(event.target.value);
  };
  const handleAcceptEdit = () => {
    if (editTitle.trim() != "") {
      handleEditTitle(id, editTitle);
      setIsEdid(false);
    }else{
      handleDelete(id)
    }
  };
  const handleDecineEdit = () => {
    setEdidTitle(title);
    setIsEdid(false);
  };

  const [isEdit, setIsEdid] = useState(false);
  const [editTitle, setEdidTitle] = useState(title);

  return (
    <div className="flex items-center group">
      <div
        className={`p-1 flex max-w-max justify-start items-center ${
          isChecked ? "checked" : ""
        }`}
      >
        <input
          className="mr-2 w-4 h-4"
          type="checkbox"
          checked={isChecked}
          onChange={handleClick}
        />

        {isEdit ? (
          <input
            className="mr-2 p-0 pl-1 focus:outline-none"
            type="text"
            value={editTitle}
            onChange={handleEditChange}
          />
        ) : (
          <label onClick={handleClick} htmlFor="">
            {" "}
            {title}
          </label>
        )}
      </div>

      {isEdit ? (
        <div className="flex">
          <AcceptIcon
            onClick={handleAcceptEdit}
            className="w-4 h-4 ml-4 fill-gray-500 hover:fill-green-500 transition-opacity duration-300  cursor-pointer opacity-0  group-hover:opacity-100"
          />
          <CloseIcon
            onClick={handleDecineEdit}
            className="w-4 h-4 ml-4 fill-gray-500 hover:fill-red-500 transition-opacity duration-300  cursor-pointer opacity-0  group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="flex">
          <CloseIcon
            onClick={handleDel}
            className="w-4 h-4 ml-4 fill-gray-500 hover:fill-red-500 transition-opacity duration-300  cursor-pointer opacity-0  group-hover:opacity-100"
          />
          <EditIcon
            onClick={handleEdit}
            className="w-4 h-4 ml-4 fill-gray-500 hover:fill-green-500 transition-opacity duration-300  cursor-pointer opacity-0  group-hover:opacity-100"
          />
        </div>
      )}
    </div>
  );
};

export default Task;
