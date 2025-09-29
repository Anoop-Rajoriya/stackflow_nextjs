import React from "react";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  value: string;
  placeholder: string;
  onEdit: (value: string) => void;
};

function Editor({ value, placeholder, onEdit }: Props) {
  function onChange(value: string | undefined) {
    if (typeof value === "string") {
      onEdit(value);
    }
  }
  return (
    <MDEditor
      preview="edit"
      value={value}
      onChange={onChange}
      textareaProps={{ placeholder }}
      className="w-full"
    />
  );
}

export default Editor;
