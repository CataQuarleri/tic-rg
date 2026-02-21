import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContributionModal from '../components/Contribution/ContributionModal';
import { supabase } from '../lib/supabaseClient';

describe('ContributionModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<ContributionModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Propose Resource/i)).toBeInTheDocument();
  });

  it('submits form data and shows success message', async () => {
    const onClose = vi.fn();
    
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(supabase.from).mockReturnValue({
      insert: mockInsert
    });

    render(<ContributionModal isOpen={true} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Resource name/i), { target: { value: 'New Test Resource' } });
    fireEvent.change(screen.getByPlaceholderText(/https:\/\/.../i), { target: { value: 'https://test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Briefly describe why/i), { target: { value: 'It is helpful because...' } });

    const submitBtn = screen.getByText(/Submit Proposal/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Thanks for contributing!/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    // The modal has a 3000ms timeout before calling onClose
    // We wait for onClose with a longer timeout
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 4000 });
  });

  it('aborts submission if honeypot field is filled', async () => {
    const onClose = vi.fn();
    render(<ContributionModal isOpen={true} onClose={onClose} />);

    const honeypot = screen.getByLabelText(/Verification Field/i);
    fireEvent.change(honeypot, { target: { value: 'I am a bot' } });

    const form = screen.getByLabelText(/Contribution Form/i);
    fireEvent.submit(form);

    expect(onClose).toHaveBeenCalled();
    expect(supabase.from).not.toHaveBeenCalled();
  });
});
