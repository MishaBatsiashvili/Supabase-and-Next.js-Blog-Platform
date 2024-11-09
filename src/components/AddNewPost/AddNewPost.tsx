"use client";
import React, {useState } from "react";
import AddNewPostModal from "./AddNewPostModal";

const AddNewPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        className="py-2 px-4 bg-black text-white text-sm rounded-md"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        New Post +
      </button>

      <AddNewPostModal
        {...{
          modalIsOpen,
          setModalIsOpen,
        }}
      />
    </>
  );
};

export default AddNewPost;
