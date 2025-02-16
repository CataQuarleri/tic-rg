import React, { createContext, useState } from 'react';
import { resources } from '../data/resources';

 export const ResourceContext = createContext();

 export const ResourceProvider = ({ children }) => {
  // timeFilter is an object like {min: 0, max: 5} etc.
  const [timeFilter, setTimeFilter] = useState(null);
  // typeFilter will be one of "article", "video", "research"
  const [typeFilter, setTypeFilter] = useState(null);
  // populationFilter defaults to "All" (or a specific population)
  const [populationFilter, setPopulationFilter] = useState('All');

  return (
    <ResourceContext.Provider value={{
      resources: resources,
      timeFilter,
      setTimeFilter,
      typeFilter,
      setTypeFilter,
      populationFilter,
      setPopulationFilter,
    }}>
      {children}
    </ResourceContext.Provider>
  );
};