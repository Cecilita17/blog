import React, { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const SlateEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "paragraph":
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  // Ensure that value is always a valid Slate document
  const initialValue = useMemo(
    () =>
      Array.isArray(value) && value.length > 0
        ? value
        : [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
    [value]
  );

  return (
    <Slate editor={editor} value={initialValue} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        placeholder="Write your post here..."
      />
    </Slate>
  );
};

export default SlateEditor;
