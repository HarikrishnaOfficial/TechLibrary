/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ContactUs from '../Components/ContactUs';

// Mock axios
jest.mock('axios');

describe('ContactUs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs correctly', () => {
    render(<ContactUs />);

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument();
  });

  test('shows error messages on invalid input', async () => {
    render(<ContactUs />);

    fireEvent.click(screen.getByText(/Post/i));

    expect(screen.getByText(/User Name is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Message is required./i)).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(<ContactUs />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message:/i), { target: { value: 'This is a test message.' } });

    fireEvent.click(screen.getByText(/Post/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://formspree.io/f/xrbzbeao',
        {
          userName: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message.',
        }
      );
      expect(screen.queryByText(/User Name is required./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Email is required./i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Message is required./i)).not.toBeInTheDocument();
    });
  });

});
