import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResourceCard from '../components/ResourceCard/ResourceCard';

// Mock the ResourceViewer component
vi.mock('../components/Modal/ResourceViewer', () => ({
  default: ({ isOpen, onClose }) => isOpen ? (
    <div data-testid="mock-viewer">
      <button onClick={onClose} aria-label="Close Viewer">Close Viewer</button>
    </div>
  ) : null
}));

const mockResource = {
  id: 1,
  title: 'Test Resource',
  type: 'video',
  time: 15,
  url: 'https://example.com',
  description: 'Test description'
};

describe('ResourceCard Component', () => {
  it('renders resource information correctly', () => {
    render(<ResourceCard resource={mockResource} />);
    
    expect(screen.getByText('Test Resource')).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
  });

  it('toggles bookmark state when clicked', () => {
    render(<ResourceCard resource={mockResource} />);
    
    const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
    // Bookmark starts unselected (check for specific class if needed, or just that it doesn't crash)
    fireEvent.click(bookmarkButton);
    // It should now be "saved" (can check classes if defined)
    expect(bookmarkButton.className).toContain('text-sage-500');
  });

  it('opens the viewer when title is clicked', () => {
    render(<ResourceCard resource={mockResource} />);
    
    const title = screen.getByText('Test Resource');
    fireEvent.click(title);
    
    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
  });

  it('opens the viewer when preview button is clicked', () => {
    render(<ResourceCard resource={mockResource} />);
    
    const previewButton = screen.getByText(/preview/i);
    fireEvent.click(previewButton);
    
    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
  });

  it('closes the viewer when onClose is triggered', () => {
    render(<ResourceCard resource={mockResource} />);
    
    fireEvent.click(screen.getByText(/preview/i));
    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Close Viewer'));
    expect(screen.queryByTestId('mock-viewer')).not.toBeInTheDocument();
  });
});
