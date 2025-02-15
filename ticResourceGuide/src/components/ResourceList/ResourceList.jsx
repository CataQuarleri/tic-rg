import React, { useContext } from 'react';
import { ResourceContext } from '../../context/ResourceContext';
import ResourceCard from '../ResourceCard/ResourceCard';
import styles from './ResourceList.module.css';

const ResourceList = () => {
  const { resources, timeFilter, typeFilter, populationFilter, setPopulationFilter } = useContext(ResourceContext);
  
  // Filter resources by time and type (and population if selected)
  const filteredResources = resources.filter(resource => {
    return resource.time >= timeFilter.min &&
           resource.time < timeFilter.max &&
           resource.type === typeFilter &&
           (populationFilter === 'All' || resource.population === populationFilter);
  });
  
  // Derive a list of unique populations from the filtered resources
  const populations = Array.from(new Set(resources.map(r => r.population)));
  
  return (
    <div className={styles.resourceList}>
      <h2>Resources</h2>
      <div className={styles.filterSection}>
        <label htmlFor="population">Filter by Population:</label>
        <select
          id="population"
          value={populationFilter}
          onChange={(e) => setPopulationFilter(e.target.value)}
        >
          <option value="All">All</option>
          {populations.map(pop => (
            <option key={pop} value={pop}>{pop}</option>
          ))}
        </select>
      </div>
      <div className={styles.cardsContainer}>
        {filteredResources.length ? (
          filteredResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))
        ) : (
          <p>No resources match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ResourceList;