import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FieldErrorItem from "../common/form/FieldError/FieldError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GetPostsQuery } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "@/graphql/client/mutations/UPDATE_POST";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import { toast } from "react-toastify";

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type InputsType = z.infer<typeof schema>;

const EditPostModal: React.FC<{
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: NonNullable<GetPostsQuery["posts"]>[0];
}> = ({ modalIsOpen, setModalIsOpen, post }) => {
  const [postIsUpdating, setPostIsUpdating] = useState(false);
  const [updatePostMutation, { data, loading, error }] = useMutation(
    UPDATE_POST,
    {
      refetchQueries: [{ query: GET_POSTS }],
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  useEffect(() => {
    reset();
  }, [modalIsOpen, reset]);

  const submit = async (formData: InputsType) => {
    const { title, content } = formData;

    setPostIsUpdating(true);

    const { errors } = await updatePostMutation({
      variables: {
        input: {
          id: post.id,
          title,
          content,
        },
      },
    });

    setPostIsUpdating(false);

    if (errors) {
      toast.error("Something went wrong");
      return;
    }

    toast.success("Post Updated");
    setModalIsOpen(false);
  };

  return (
    <Dialog.Root open={modalIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="block fixed w-full h-full bg-black  opacity-60"
          onClick={() => setModalIsOpen(false)}
        />
        <Dialog.Content className="m-3 block fixed text-black p-6 max-w-[500px] w-1/2 bg-white rounded-md left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Dialog.Title className="text-2xl font-bold text-center">
            Edit Post
          </Dialog.Title>
          <Dialog.Description>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <label className="block font-semibold" htmlFor="title">
                  Title
                </label>
                <FieldErrorItem className="mt-1" error={errors["title"]} />
                <input
                  {...register("title")}
                  disabled={postIsUpdating}
                  id="title"
                  className="block w-full mt-1 disabled:bg-slate-200"
                />
              </div>
              <div className="mt-3">
                <label className="block font-semibold" htmlFor="content">
                  Content
                </label>
                <FieldErrorItem className="mt-1" error={errors["content"]} />
                <textarea
                  {...register("content")}
                  disabled={postIsUpdating}
                  id="content"
                  className="block w-full mt-1 disabled:bg-slate-200"
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  disabled={postIsUpdating}
                  type="submit"
                  className="w-full px-4 py-2 bg-green-700 rounded-sm text-white disabled:opacity-80"
                >
                  {postIsUpdating ? `Creating...` : `Create`}
                </button>
                <button
                  disabled={postIsUpdating}
                  type="button"
                  className="w-full px-4 py-2 bg-slate-500 rounded-sm text-white disabled:opacity-80"
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditPostModal;
