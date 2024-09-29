import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory } from '../api/categories';

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
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
    <div className="w-64 bg-gray-100 p-4 hidden md:block relative h-screen border-r border-gray-400">
      <h2 className="text-xl mb-4 text-turq font-bold">Categories</h2>
      <ul className="overflow-y-auto h-[calc(100%-12rem)]">
        {categories?.map((category) => (
          <li key={category.id} className="mb-2">
            <span className="text-turq">{category.name}</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-400"
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="w-full p-2 mb-2 border bg-white border-gray-400"
        />
        <button
          type="submit"
          className="w-full p-2 bg-turq text-white rounded-none"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryList;
