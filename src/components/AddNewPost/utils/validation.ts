import { getFileType } from "@/utils/helpers/getFileType";
import { isFileList } from "@/utils/helpers/isFileList";
import { z } from "zod";

export const MAX_FILE_SIZE = 1024 * 1024;
export const schema = z.object({
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