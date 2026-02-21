import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResourceProvider, ResourceContext } from '../context/ResourceContext';
import React, { useContext } from 'react';

// Mock useResources
vi.mock('../hooks/useResources', () => ({
  useResources: vi.fn(() => ({
    data: [{ id: 1, title: 'Test' }],
    isLoading: false,
    error: null
  }))
}));

const TestComponent = () => {
  const { 
    timeFilter, setTimeFilter, 
    typeFilter, setTypeFilter, 
    populationFilter, setPopulationFilter,
    clearFilters,
    resources
  } = useContext(ResourceContext);

  return (
    <div>
      <div data-testid="time">{timeFilter}</div>
      <div data-testid="type">{typeFilter}</div>
      <div data-testid="pop">{populationFilter}</div>
      <div data-testid="count">{resources.length}</div>
      <button onClick={() => setTimeFilter(20)}>Set Time</button>
      <button onClick={() => setTypeFilter('video')}>Set Type</button>
      <button onClick={() => setPopulationFilter('healthcare')}>Set Pop</button>
      <button onClick={clearFilters}>Clear</button>
    </div>
  );
};

describe('ResourceContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides default values', () => {
    render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    expect(screen.getByTestId('pop').textContent).toBe('All');
    expect(screen.getByTestId('count').textContent).toBe('1');
  });

  it('updates filters and persists to localStorage', () => {
    render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    fireEvent.click(screen.getByText('Set Time'));
    expect(screen.getByTestId('time').textContent).toBe('20');
    expect(localStorage.getItem('timeFilter')).toBe('20');

    fireEvent.click(screen.getByText('Set Type'));
    expect(screen.getByTestId('type').textContent).toBe('video');
    expect(localStorage.getItem('typeFilter')).toBe('video');
  });

  it('clears filters', () => {
    render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    fireEvent.click(screen.getByText('Set Time'));
    fireEvent.click(screen.getByText('Clear'));

    expect(screen.getByTestId('time').textContent).toBe('');
    expect(screen.getByTestId('pop').textContent).toBe('All');
    expect(localStorage.getItem('timeFilter')).toBeNull();
  });

  it('loads initial state from localStorage', () => {
    localStorage.setItem('timeFilter', '40');
    localStorage.setItem('populationFilter', 'youth');

    render(
      <ResourceProvider>
        <TestComponent />
      </ResourceProvider>
    );

    expect(screen.getByTestId('time').textContent).toBe('40');
    expect(screen.getByTestId('pop').textContent).toBe('youth');
  });
});
