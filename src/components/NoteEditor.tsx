import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchNote, updateNote } from '../api/notes';

const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNote(id ?? ''),
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
    updateNoteMutation.mutate({ id, content: e.target.value ?? '' });
  };

  if (isLoading) return <div>Loading note...</div>;
  if (error) return <div>Error fetching note</div>;

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl mb-4 text-turq">{note?.title}</h1>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full h-[calc(100vh-150px)] p-4 text-turq bg-white rounded shadow-md font-mono"
        />
      </div>
    </div>
  );
};

export default NoteEditor;
