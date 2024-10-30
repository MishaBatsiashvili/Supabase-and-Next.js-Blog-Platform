import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import FieldError from "../common/form/FieldError/FieldError";
import { FormState, UseFormRegister } from 'react-hook-form';
import { InputsType } from './AddNewPost';

const AddNewPostModal: React.FC<{
    modalIsOpen: boolean
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: () => void
    formState: FormState<InputsType>
    register: UseFormRegister<InputsType>
    postIsCreating: boolean
}> = ({
    modalIsOpen,
    setModalIsOpen,
    onSubmit,
    formState,
    register,
    postIsCreating
}) => {
    const {errors} = formState

  return (
    <Dialog.Root open={modalIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="block fixed w-full h-full bg-black  opacity-60"
            onClick={() => setModalIsOpen(false)}
          />
          <Dialog.Content className="m-3 block fixed text-black p-6 max-w-[500px] w-1/2 bg-white rounded-md left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Dialog.Title className="text-2xl font-bold text-center">
              Create New Post
            </Dialog.Title>
            <Dialog.Description>
              <form onSubmit={onSubmit}>
                <div>
                  <label className="block font-semibold" htmlFor="title">
                    Title
                  </label>
                  <FieldError className="mt-1" error={errors["title"]} />
                  <input
                    {...register("title")}
                    disabled={postIsCreating}
                    id="title"
                    className="block w-full mt-1 disabled:bg-slate-200"
                  />
                </div>
                <div className="mt-3">
                  <label className="block font-semibold" htmlFor="content">
                    Content
                  </label>
                  <FieldError className="mt-1" error={errors["content"]} />
                  <textarea
                    {...register("content")}
                    disabled={postIsCreating}
                    id="content"
                    className="block w-full mt-1 disabled:bg-slate-200"
                  />
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    disabled={postIsCreating}
                    type="submit"
                    className="w-full px-4 py-2 bg-green-700 rounded-sm text-white disabled:opacity-80"
                  >
                    {postIsCreating ? `Creating...` : `Create`}
                  </button>
                  <button
                    disabled={postIsCreating}
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
  )
}

export default AddNewPostModal