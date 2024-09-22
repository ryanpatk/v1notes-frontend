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
  } = useQuery(['note', id], () => fetchNote(id));

  const updateNoteMutation = useMutation(updateNote);

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateNoteMutation.mutate({ id, content: e.target.value });
  };

  if (isLoading) return <div>Loading note...</div>;
  if (error) return <div>Error fetching note</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl mb-4">{note?.title}</h1>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-[calc(100vh-150px)] p-4 bg-white rounded shadow-md font-mono"
      />
    </div>
  );
};

export default NoteEditor;
