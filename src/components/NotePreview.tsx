import React from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface NotePreviewProps {
  note: Note;
}

const NotePreview: React.FC<NotePreviewProps> = ({ note }) => {
  return (
    <div className="bg-gray-100 p-2 border border-gray-400">
      <div className="bg-white p-4 border border-gray-400">
        <p className="text-turq mb-2">{note.content.substring(0, 100)}...</p>
      </div>

      {/* <span className="text-sm text-turq">{note.category}</span> */}
      <h3 className="text-turq text-lg font-semibold mb-2">{note.title}</h3>
    </div>
  );
};

export default NotePreview;
