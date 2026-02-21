import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const button = screen.getByText('Styled Button');
    expect(button.className).toContain('custom-class');
  });

  it('has default type="button"', () => {
    render(<Button>Button</Button>);
    const button = screen.getByText('Button');
    expect(button.getAttribute('type')).toBe('button');
  });
});
