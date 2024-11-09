export const isFileList = (value: any): value is FileList =>
  typeof FileList !== 'undefined' && value instanceof FileList;