import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchNote, updateNote } from '../api/notes';

const NoteEditor: React.FC = ({ noteId = null, onClose = () => {} }) => {
  const [content, setContent] = useState('');

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNote(noteId ?? ''),
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
  });

  useEffect(() => {
    if (note) {
      setContent(note.content || '');
    }
  }, [note]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value ?? '');
    updateNoteMutation.mutate({ id: noteId, content: e.target.value ?? '' });
  };

  if (isLoading) {
    return (
      <div>Loading note...</div>
    );
  }

  if (error) {
    return (
      <div>Error fetching note</div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full items-center bg-gray-300">
      <div className="flex flex-col flex-grow max-w-screen-xl w-full h-full px-4 sm:px-6 lg:px-8 py-8 mr-70">
        <div className="flex justify-between items-center mb-4">
          <p className="text-md font-bold w-1/3 text-turq-3 cursor-pointer" onClick={onClose}>{'< Back'}</p>
          <p className="text-md font-bold text-center w-1/3 text-turq-3">{note?.title}</p>
          <div className="w-1/3" />
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="flex-grow w-full h-full p-4 text-turq-3 bg-gray-200 border border-turq-3 font-mono resize-none"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
