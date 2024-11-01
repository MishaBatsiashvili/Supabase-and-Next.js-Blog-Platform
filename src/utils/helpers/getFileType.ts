export const getFileType = (fileName: string) => {
  // Define a map of common file extensions and their corresponding file types
  const fileTypes: { [key: string]: string } = {
    jpg: "Image",
    jpeg: "Image",
    png: "Image",
    gif: "Image",
    bmp: "Image",
    tiff: "Image",
    svg: "Image",
    mp4: "Video",
    mkv: "Video",
    mov: "Video",
    avi: "Video",
    flv: "Video",
    wmv: "Video",
    pdf: "Document",
    doc: "Document",
    docx: "Document",
    xls: "Document",
    xlsx: "Document",
    ppt: "Document",
    pptx: "Document",
    txt: "Text",
    md: "Markdown",
    html: "HTML",
    css: "Stylesheet",
    js: "JavaScript",
    ts: "TypeScript",
    json: "JSON",
    xml: "XML",
    zip: "Archive",
    rar: "Archive",
    "7z": "Archive",
  };

  // Extract the file extension from the file name
  const extension = fileName.split(".").pop()?.toLowerCase();

  return {
    fileType:
      extension && fileTypes[extension] ? fileTypes[extension] : "Unknown",
    fileExtension: extension ?? "Unknown",
  };
};
