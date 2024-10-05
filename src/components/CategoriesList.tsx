import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory } from '../api/categories';

interface Category {
  id: string;
  name: string;
}

interface CategoriesListProps {
  categories: Category[];
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNewCategoryName('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      createCategoryMutation.mutate({ name: newCategoryName.trim() });
    }
  };

  return (
    <div className="w-64 bg-gray-300 p-4 hidden md:block relative h-screen border-r border-turq-3">
      <h2 className="text-md mb-4 text-turq-3 font-bold">Categories</h2>
      <ul className="overflow-y-auto h-[calc(100%-12rem)]">
        {categories?.map((category) => (
          <li
            key={category.id}
            className="mb-2 cursor-pointer"
            onClick={() => {
              if (selectedCategoryId === category.id) {
                setSelectedCategoryId(null);
              } else {
                setSelectedCategoryId(category.id);
              }
            }}
          >
            <span
              className={`text-turq-3 ${
                selectedCategoryId === category.id ? 'font-bold' : ''
              }`}
            >
              {category.name}
            </span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-turq-3"
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category"
          className="w-full p-2 mb-2 border bg-white border-turq-3 text-turq-3"
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-white px-4 py-2 rounded-none hover:bg-gray-500 transition-colors"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoriesList;
