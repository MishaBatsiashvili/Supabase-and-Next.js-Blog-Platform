import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FieldErrorItem from "../common/form/FieldError/FieldError";
import { getFileType } from "@/utils/helpers/getFileType";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/client/mutations/CREATE_POST";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import { toast } from "react-toastify";
import { S3Client } from "@aws-sdk/client-s3";
import axios from "axios";

const MAX_FILE_SIZE = 1024 * 1024;
const isFileList = (value: any): value is FileList =>
  typeof FileList !== 'undefined' && value instanceof FileList;


const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.custom<FileList>((value) => isFileList(value), {
    message: "Expected a FileList",
  }).refine(
      (files) => files !== undefined && files !== null,
      "File is required"
    )
    .refine((files: FileList) => files?.length !== 0, "File is required")
    .refine(
      (files: FileList) => files[0]?.size < MAX_FILE_SIZE,
      "Max size is 1MB."
    )
    .refine((files: FileList) => {
      if (!files[0]?.name) {
        return false;
      }
      const allowedExtensions = ["jpg", "jpeg"];
      const fileMetadata = getFileType(files[0]?.name);
      return allowedExtensions.includes(fileMetadata.fileExtension);
    }, "Only .jpg and .jpeg formats are supported."),
});

export type InputsType = z.infer<typeof schema>;

const AddNewPostModal: React.FC<{
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalIsOpen, setModalIsOpen }) => {
  const formMethods = useForm<InputsType>({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onError: () => toast.error("Something went wrong"),
    onCompleted: () => {
      toast.success("Post Created");
      setModalIsOpen(false);
    },
  });

  useEffect(() => {
    if (modalIsOpen) {
      reset();
    }
  }, [modalIsOpen, reset]);

  const submit = async ({ title, content }: InputsType) => {
    await createPost({ variables: { input: { title, content } } });
  };

  const s3Upload = () => {
    const s3Client = new S3Client({
      region: "eu-central-1", // e.g., 'us-west-2'
      credentials: {
        accessKeyId: "your-access-key-id", // Ensure these are secured, e.g., using environment variables
        secretAccessKey: "your-secret-access-key",
      },
    });
  };

  return (
    <Dialog.Root open={modalIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="block fixed w-full h-full bg-black  opacity-60"
          onClick={() => setModalIsOpen(false)}
        />
        <Dialog.Content className="m-3 block fixed text-black p-6 max-w-[500px] w-1/2 bg-white rounded-md left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Dialog.Title className="text-xl font-bold text-center">
            Create New Post
          </Dialog.Title>
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <label className="block font-semibold text-sm" htmlFor="title">
                  Title
                </label>
                <FieldErrorItem className="mt-1" error={errors["title"]} />
                <input
                  {...register("title")}
                  disabled={loading}
                  id="title"
                  className="block border border-slate-400 w-full mt-1 disabled:bg-slate-200 rounded"
                />
              </div>

              <div className="mt-3">
                <label
                  className="block font-semibold text-sm"
                  htmlFor="content"
                >
                  Content
                </label>
                <FieldErrorItem className="mt-1" error={errors["content"]} />
                <textarea
                  {...register("content")}
                  disabled={loading}
                  id="content"
                  className="block border border-slate-400 w-full mt-1 disabled:bg-slate-200 rounded"
                />
              </div>

              <div className="mt-3">
                <label
                  className="block font-semibold text-sm"
                  htmlFor="content"
                >
                  Image
                </label>
                <FieldErrorItem className="mt-1" error={errors["image"]} />
                <input
                  {...register("image")}
                  type="file"
                  disabled={loading}
                  className="block border border-slate-400 w-full mt-1 disabled:bg-slate-200 rounded"
                  onChange={(e) => {
                    console.log(e?.target?.files?.[0])
                    // axios.get('/api/s3image-upload-url')
                  }}
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white text-sm disabled:opacity-80 rounded-md"
                >
                  {loading ? `Creating...` : `Create`}
                </button>
                <button
                  disabled={loading}
                  type="button"
                  className="w-full px-4 py-2 bg-slate-500 text-white text-sm disabled:opacity-80 rounded-md"
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddNewPostModal;
