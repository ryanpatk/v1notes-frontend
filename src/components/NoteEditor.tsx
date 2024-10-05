import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import { fetchNote, updateNote } from '../api/notes';

// Custom hook for debounced function
const useDebounce = (callback: Function, delay: number) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    debounce((...args: any[]) => {
      callbackRef.current(...args);
    }, delay),
    [delay],
  );
};

const NoteEditor: React.FC<{ noteId: string | null; onClose: () => void }> = ({
  noteId = null,
  onClose = () => {},
}) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNote(noteId ?? ''),
    enabled: Boolean(noteId),
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      console.log('Mutation successful');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const debouncedUpdate = useDebounce((id: string, content: string) => {
    console.log('Debounced update called', id, content);
    updateNoteMutation.mutate({ id, content });
  }, 1500);

  useEffect(() => {
    if (note) {
      setContent(note.content || '');
    }
  }, [note]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      console.log('Content changed', newContent);
      setContent(newContent);
      if (noteId) {
        console.log('Calling debouncedUpdate');
        debouncedUpdate(noteId, newContent);
      }
    },
    [noteId, debouncedUpdate],
  );

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  if (isLoading) {
    return <div>Loading note...</div>;
  }

  if (error) {
    return <div>Error fetching note</div>;
  }

  return (
    <div className="flex flex-col h-full w-full items-center bg-gray-300">
      <div className="flex flex-col flex-grow max-w-screen-xl w-full h-full px-4 sm:px-6 lg:px-8 py-8 mr-70">
        <div className="flex justify-between items-center mb-4">
          <p
            className="text-md font-bold w-1/3 text-turq-3 cursor-pointer"
            onClick={onClose}
          >
            {'< Back'}
          </p>
          <p className="text-md font-bold text-center w-1/3 text-turq-3">
            {note?.title}
          </p>
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
