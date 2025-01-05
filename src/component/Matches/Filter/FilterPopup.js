import React, { useState } from 'react';
import { X } from 'lucide-react';

function FilterPopup({
  section,
  selectedOptions,
  handleOptionChange,
  onClose,
}) {
  const [ searchQuery, setSearchQuery ] = useState('');

  if (!section) return null;

  const filteredOptions = section.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full h-[70vh] overflow-y-auto relative">
        <div className="sticky top-0 left-0 right-0 px-6 py-4 bg-gray-100 rounded-t-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-lg font-medium mb-2">{section.title}</h3>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2 p-6">
          {filteredOptions.map((option) => (
            <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type={section.type}
                name={section.id}
                checked={selectedOptions?.includes(option.id) || false}
                onChange={() =>
                  handleOptionChange(
                    section.id,
                    option.id,
                    section.type
                  )
                }
                className={
                  section.type === 'checkbox'
                    ? 'form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-500'
                    : 'form-radio border-gray-300 text-blue-500 focus:ring-blue-500'
                }
              />
              <span className="text-gray-600 text-sm">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-gray-400 text-sm">({option.count})</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;