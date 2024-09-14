import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchNotes } from '../api/notes';
import CategoryList from './CategoryList';
import NotePreview from './NotePreview';

const Dashboard: React.FC = () => {
  const { data: notes, isLoading, error } = useQuery('notes', fetchNotes);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching notes</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CategoryList />
      <div className="flex-1 p-8">
        <h1 className="text-2xl mb-4">My Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes?.map((note) => (
            <Link key={note.id} to={`/note/${note.id}`}>
              <NotePreview note={note} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
