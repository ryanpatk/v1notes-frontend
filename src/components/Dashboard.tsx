import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { createNote, fetchNotes } from '../api/notes';
import { fetchCategories } from '../api/categories';
import CategoriesList from './CategoriesList';
import NewNoteModal from './NewNoteModal';
import NotePreview from './NotePreview';
import NoteEditor from './NoteEditor';

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();

  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

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

  if (isNotesLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (notesError || categoriesError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex min-h-screen w-screen bg-gray-300">
      <CategoriesList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <div className="flex-1 p-8 flex flex-col">
        {selectedNoteId ? (
          <NoteEditor
            noteId={selectedNoteId}
            onClose={() => setSelectedNoteId(null)}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-turq-3 font-bold font-mono">
                My Notes
              </p>
              <button
                onClick={() => setIsNewNoteModalOpen(true)}
                className="bg-turq-3 text-white px-4 py-2 rounded-none hover:bg-turq-4 transition-colors"
              >
                New Note
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes?.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className="h-[196px] cursor-pointer"
                  >
                    <NotePreview note={note} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
