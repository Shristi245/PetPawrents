import React from 'react';

const Sidebar = ({ categories, brands, onCategorySelect, onBrandSelect }) => {
  return (
    <div className="bg-gray-200 w-1/4 h-screen p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="cursor-pointer mb-2" onClick={() => onCategorySelect(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Brands</h2>
        <ul>
          {brands.map((brand, index) => (
            <li key={index} className="cursor-pointer mb-2" onClick={() => onBrandSelect(brand)}>
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
