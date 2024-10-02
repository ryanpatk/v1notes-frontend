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
    <div className="flex flex-col bg-gray-300 h-[196px] p-3 border border-turq-3">
      <div className="bg-gray-200 flex-grow p-4 border border-turq-3 overflow-y-auto">
        <p className="text-turq-3 mb-2">{note.content}</p>
      </div>
      <h3 className="text-turq-3 text-md font-semibold mt-2 mb-1">{note.title}</h3>
    </div>
  );
};

export default NotePreview;
