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
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-2">{note.content.substring(0, 100)}...</p>
      <span className="text-sm text-blue-500">{note.category}</span>
    </div>
  );
};

export default NotePreview;
