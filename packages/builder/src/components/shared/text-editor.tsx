import { FC, lazy } from "react";
import ReactQuillProps from "react-quill-new";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps extends ReactQuillProps {
  onChange?: (content: string) => void;
}

const ReactQuill = lazy(() => import("react-quill-new"));

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "align",
  "indent",
  "link",
];

const TextEditor: FC<TextEditorProps> = ({ value, onChange, ...props }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(content, _, source) => {
        if (source === "user") {
          onChange?.(content);
        }
      }}
      modules={modules}
      formats={formats}
      {...props}
    />
  );
};

export default TextEditor;
