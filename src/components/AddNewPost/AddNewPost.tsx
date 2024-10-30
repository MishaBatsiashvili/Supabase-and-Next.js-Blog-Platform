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

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type InputsType = z.infer<typeof schema>;

const AddNewPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postIsCreating, setPostIsCreating] = useState(false);
  const [createPostMutation, { data, loading, error }] = useMutation(
    CREATE_POST,
    {
      refetchQueries: [{ query: GET_POSTS }],
    }
  );

  const { register, handleSubmit, formState, reset } = useForm<InputsType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [modalIsOpen, reset]);

  const submit = async (formData: InputsType) => {
    const { title, content } = formData;

    setPostIsCreating(true);

    const res = await createPostMutation({
      variables: {
        input: {
          title,
          content,
        },
      },
    });

    setPostIsCreating(false);

    if (res.errors) {
      toast.error("Something went wrong");
      return;
    }

    toast.success("Post Created");

    setModalIsOpen(false);
  };

  return (
    <>
      <button
        className="py-2 px-4 bg-slate-500 text-white rounded-md"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        New Post
      </button>

      <AddNewPostModal
        {...{
          modalIsOpen,
          setModalIsOpen,
          onSubmit: handleSubmit(submit),
          formState,
          register,
          postIsCreating,
        }}
      />
    </>
  );
};

export default AddNewPost;
