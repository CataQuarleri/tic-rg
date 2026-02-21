import React, { createContext, useState, useEffect } from 'react';
import { useResources } from '../hooks/useResources';

export const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  // Fetch from Supabase
  const { data: dbResources, isLoading, error } = useResources();

  // Initialize state by reading from localStorage (if available)
  const [timeFilter, setTimeFilter] = useState(() => {
    const stored = localStorage.getItem("timeFilter");
    return stored ? JSON.parse(stored) : null;
  });
  const [typeFilter, setTypeFilter] = useState(() => {
    const stored = localStorage.getItem("typeFilter");
    return stored ? stored : null;
  });
  const [populationFilter, setPopulationFilter] = useState(() => {
    const stored = localStorage.getItem("populationFilter");
    return stored || "All";
  });

  // Whenever a filter changes, update localStorage
  useEffect(() => {
    if (timeFilter !== null)
      localStorage.setItem("timeFilter", JSON.stringify(timeFilter));
    if (typeFilter !== null)
      localStorage.setItem("typeFilter", typeFilter);
    if (populationFilter !== null)
      localStorage.setItem("populationFilter", populationFilter);
  }, [timeFilter, typeFilter, populationFilter]);

  // Function to clear filters
  const clearFilters = () => {
    setTimeFilter(null);
    setTypeFilter(null);
    setPopulationFilter('All');
    localStorage.removeItem("timeFilter");
    localStorage.removeItem("typeFilter");
    localStorage.removeItem("populationFilter");
  };

  return (
    <ResourceContext.Provider value={{
      resources: dbResources || [],
      isLoading,
      error,
      timeFilter,
      setTimeFilter,
      typeFilter,
      setTypeFilter,
      populationFilter,
      setPopulationFilter,
      clearFilters,
    }}>
      {children}
    </ResourceContext.Provider>
  );
};
