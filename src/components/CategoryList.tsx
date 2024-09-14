import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';

const CategoryList: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery('categories', fetchCategories);

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error fetching categories</div>;

  return (
    <div className="w-64 bg-gray-200 p-4 hidden md:block">
      <h2 className="text-xl mb-4">Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id} className="mb-2">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
