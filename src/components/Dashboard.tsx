import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchNotes, createNote } from '../api/notes';
import { fetchCategories } from '../api/categories';
import CategoryList from './CategoryList';
import NotePreview from './NotePreview';
import NewNoteModal from './NewNoteModal';

const Dashboard: React.FC = () => {
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading: isNotesLoading,
    error: notesError,
  } = useQuery({ queryKey: ['notes'], queryFn: fetchNotes });
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsNewNoteModalOpen(false);
    },
  });

  if (isNotesLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (notesError || categoriesError) return <div>Error fetching data</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CategoryList categories={categories} />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-turq font-bold">My Notes</h1>
          <button
            onClick={() => setIsNewNoteModalOpen(true)}
            className="bg-turq text-white px-4 py-2 rounded-none"
          >
            New Note
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes?.map((note) => (
            <Link key={note.id} to={`/note/${note.id}`}>
              <NotePreview note={note} />
            </Link>
          ))}
        </div>
      </div>
      {isNewNoteModalOpen && (
        <NewNoteModal
          categories={categories}
          onClose={() => setIsNewNoteModalOpen(false)}
          onSubmit={(newNote) => createNoteMutation.mutate(newNote)}
        />
      )}
    </div>
  );
};

export default Dashboard;
