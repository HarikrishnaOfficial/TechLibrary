/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StoriesTable from '../Components/StoriesTable';

const mockStories = [
  {
    id: 1,
    url: 'http://example.com',
    title: 'Example Story',
    author: 'Author 1',
    num_comments: 10,
    points: 100,
    postedOn: '2023-08-22'
  },
];

const mockHandleRemove = jest.fn();
const mockHandleUpdate = jest.fn();

describe('StoriesTable Component', () => {
  test('renders stories correctly', () => {
    render(
      <Router>
        <StoriesTable stories={mockStories} handleRemove={mockHandleRemove} handleUpdate={mockHandleUpdate} />
      </Router>
    );

    expect(screen.getByText(/Example Story/i)).toBeInTheDocument();
    expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
  });

  test('calls handleRemove when remove button is clicked', () => {
    render(
      <Router>
        <StoriesTable stories={mockStories} handleRemove={mockHandleRemove} handleUpdate={mockHandleUpdate} />
      </Router>
    );

    fireEvent.click(screen.getByText(/Remove/i));
    expect(mockHandleRemove).toHaveBeenCalledWith(1);
  });

  test('opens modal when update button is clicked', () => {
    render(
      <Router>
        <StoriesTable stories={mockStories} handleRemove={mockHandleRemove} handleUpdate={mockHandleUpdate} />
      </Router>
    );

    fireEvent.click(screen.getByText(/Update/i));
    expect(screen.getByText(/Update Story/i)).toBeInTheDocument();
  });
});
