import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FieldErrorItem from "../common/form/FieldError/FieldError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/graphql/client/mutations/CREATE_POST";
import { GET_POSTS } from "@/graphql/client/queries/GET_POSTS";
import { toast } from "react-toastify";
import { useS3Upload } from "@/utils/hooks/useS3Upload";
import { InputsType, schema } from "./utils/validation";

const AddNewPostModal: React.FC<{
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalIsOpen, setModalIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  });

  const {handleS3FileUpload, fileIsUploading} = useS3Upload()

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

  const submit = async ({ title, content, image }: InputsType) => {
    const objectKey = await handleS3FileUpload(image[0])
    if(!objectKey){
      toast.error('Problem uploading image')
      return
    }
    await createPost({ variables: { input: { title, content, s3_image_object_key: objectKey } } });
  };

  const isLoading = loading || fileIsUploading

  return (
    <Dialog.Root open={modalIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="block fixed w-full h-full bg-black  opacity-60"
          onClick={() => {
            if(!isLoading){
              setModalIsOpen(false)
            }
          }}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  className="block border border-slate-400 w-full mt-1 disabled:bg-slate-200 rounded"
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white text-sm disabled:opacity-80 rounded-md"
                >
                  {loading ? `Creating...` : `Create`}
                </button>
                <button
                  disabled={isLoading}
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
