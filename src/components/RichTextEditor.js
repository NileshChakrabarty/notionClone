import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css'; // Import the CSS file

const RichTextEditor = React.forwardRef(({ content, onChange }, ref) => {
  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={ref}  // Forward the ref to ReactQuill
        value={content}
        onChange={onChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Write something..."
      />
    </div>
  );
});

// Add modules for formatting options
RichTextEditor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['code-block'],
    ['blockquote', 'list', 'bullet'],
    ['image', 'video'],
    ['clean'], // remove formatting button
  ],
};

// Define the formats
RichTextEditor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'code-block',
  'blockquote',
  'list',
  'bullet',
  'image',
  'video',
];

export default RichTextEditor;
