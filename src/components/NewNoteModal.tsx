import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface NewNoteModalProps {
  categories: Category[];
  onClose: () => void;
  onSubmit: (newNote: {
    title: string;
    content: string;
    categoryId: string;
  }) => void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  categories,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim() && categoryId) {
      onSubmit({ title: title.trim(), content: content.trim(), categoryId });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-md font-medium leading-6 text-turq-3 mb-4">
          Create New Note
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            className="w-full p-2 mb-4 border rounded h-32"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-turq-3 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 text-turq-3 rounded"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNoteModal;
