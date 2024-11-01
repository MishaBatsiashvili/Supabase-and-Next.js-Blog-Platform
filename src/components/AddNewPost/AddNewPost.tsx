"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/client/mutations/CREATE_POST";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import { toast } from "react-toastify";
import AddNewPostModal from "./AddNewPostModal";
import { getFileType } from "@/utils/helpers/getFileType";



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
