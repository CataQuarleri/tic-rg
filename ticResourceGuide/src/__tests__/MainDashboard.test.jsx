import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainDashboard from '../Pages/Dashboard/MainDashboard';
import { ResourceContext } from '../context/ResourceContext';
import React from 'react';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

const mockResources = [
  { id: 1, title: 'Short Video', time: 5, type: 'video', population: 'youth', url: 'v1' },
  { id: 2, title: 'Long Article', time: 20, type: 'article', population: 'healthcare', url: 'a1' },
  { id: 3, title: 'Research Paper', time: 40, type: 'research-paper', population: 'general', url: 'r1' },
];

const renderDashboard = (contextValue) => {
  return render(
    <ResourceContext.Provider value={contextValue}>
      <MainDashboard />
    </ResourceContext.Provider>
  );
};

describe('MainDashboard Discovery Flow', () => {
  let contextValue;

  beforeEach(() => {
    contextValue = {
      resources: mockResources,
      isLoading: false,
      error: null,
      timeFilter: null,
      setTimeFilter: vi.fn((val) => { contextValue.timeFilter = val; }),
      typeFilter: null,
      setTypeFilter: vi.fn((val) => { contextValue.typeFilter = val; }),
      populationFilter: 'All',
      setPopulationFilter: vi.fn((val) => { contextValue.populationFilter = val; }),
      clearFilters: vi.fn(),
    };
  });

  it('starts with only the Time Lens visible', () => {
    renderDashboard(contextValue);
    
    expect(screen.getByText(/Choose your window of time/i)).toBeInTheDocument();
    // Step 2 should not be visible initially (no categories)
    expect(screen.queryByText(/What are you looking for/i)).not.toBeInTheDocument();
  });

  it('unlocks Step 2 after selecting a time', async () => {
    const { rerender } = renderDashboard(contextValue);
    
    // Simulate selecting 5m
    fireEvent.click(screen.getByText(/5 min/i));
    expect(contextValue.setTimeFilter).toHaveBeenCalledWith(5);

    // Update context mock to reflect selected time
    contextValue.timeFilter = 5;
    rerender(
      <ResourceContext.Provider value={contextValue}>
        <MainDashboard />
      </ResourceContext.Provider>
    );

    expect(screen.getByText(/What are you looking for/i)).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  it('unlocks results after selecting a category', () => {
    contextValue.timeFilter = 5;
    const { rerender } = renderDashboard(contextValue);
    
    fireEvent.click(screen.getByText('Videos'));
    expect(contextValue.setTypeFilter).toHaveBeenCalledWith('video');

    // Results should appear (filteredResources logic is inside the component using useMemo)
    // Note: The component uses typeFilter to showResults
    contextValue.typeFilter = 'video';
    rerender(
      <ResourceContext.Provider value={contextValue}>
        <MainDashboard />
      </ResourceContext.Provider>
    );

    // "Short Video" fits 5m + video
    expect(screen.getByText('Short Video')).toBeInTheDocument();
    // "Long Article" does not
    expect(screen.queryByText('Long Article')).not.toBeInTheDocument();
  });

  it('filters by population in the results step', () => {
    contextValue.timeFilter = 40;
    contextValue.typeFilter = 'article'; // Assuming we want articles
    // We need to re-render to simulate the state where results are shown
    // The component state 'showResults' is internal, triggered by handleCategorySelect.
    // In a unit test, we might need to click to trigger it.
    
    renderDashboard(contextValue);
    
    // Selecting "Articles" in the UI
    fireEvent.click(screen.getByText('Articles'));
    
    // Results for 40m + Articles: "Long Article" (20m)
    expect(screen.getByText('Long Article')).toBeInTheDocument();
    
    // Change population filter
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'youth' } });
    
    expect(contextValue.setPopulationFilter).toHaveBeenCalledWith('youth');
  });
});
