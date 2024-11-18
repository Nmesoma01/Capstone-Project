"use client";
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

const categories = [
  { title: "Hip Hop Basics", tags: ["hip hop", "basics"] },
  { title: "Ballet Techniques", tags: ["ballet", "technique"] },
  // other category objects
];

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    accountType: '',
    location: '',
    danceStyle: '',
  });
  const [filteredResources, setFilteredResources] = useState(categories);

  const updateSearch = (query, filters) => {
    const searchTerms = query.toLowerCase().split(' ');

    const filtered = categories.filter(category => {
      const matchesSearch = searchTerms.every(term =>
        category.title.toLowerCase().includes(term) ||
        category.tags.some(tag => tag.toLowerCase().includes(term))
      );

      const matchesFilters = 
        (!filters.danceStyle || category.tags.includes(filters.danceStyle.toLowerCase()));

      return matchesSearch && matchesFilters;
    });

    setFilteredResources(filtered);
    setSearchQuery(query);
    setSearchFilters({ ...searchFilters, ...filters });
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      searchFilters, 
      filteredResources, 
      updateSearch 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
