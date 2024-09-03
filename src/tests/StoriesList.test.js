/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import StoriesList from '../Components/StoriesList';

const mock = new axiosMock(axios);

describe('StoriesList', () => {
  beforeEach(() => {
    mock.reset();
    jest.spyOn(window, 'confirm').mockImplementation(() => true); // Mock window.confirm
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations
  });

  test('fetches and displays stories', async () => {
    const stories = [
      { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2023-08-01' },
      { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2023-08-02' },
    ];
    mock.onGet('http://localhost:8000/stories').reply(200, stories);

    render(
      <MemoryRouter>
        <StoriesList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Story 1')).toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });
  });

  test('filters stories by search term', async () => {
    const stories = [
      { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2023-08-01' },
      { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2023-08-02' },
    ];
    mock.onGet('http://localhost:8000/stories').reply(200, stories);

    render(
      <MemoryRouter>
        <StoriesList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Story 1')).toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search by Title or Author'), {
      target: { value: 'Story 1' },
    });

    await waitFor(() => {
      const storyTitles = screen.getAllByText('Story 1');
      expect(storyTitles).toHaveLength(2);
      expect(screen.queryByText('Story 2')).not.toBeInTheDocument();
    });
  });

  test('filters stories by date range', async () => {
    const stories = [
      { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2023-08-01' },
      { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2023-08-02' },
    ];
    mock.onGet('http://localhost:8000/stories').reply(200, stories);

    render(
      <MemoryRouter>
        <StoriesList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Story 1')).toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Filter Records From Date'), {
      target: { value: '2023-08-02' },
    });

    await waitFor(() => {
      expect(screen.queryByText('Story 1')).not.toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });
  });

  test('removes a story', async () => {
    const stories = [
      { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2023-08-01' },
      { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2023-08-02' },
    ];
    mock.onGet('http://localhost:8000/stories').reply(200, stories);
    mock.onDelete('http://localhost:8000/stories/1').reply(200);

    render(
      <MemoryRouter>
        <StoriesList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Story 1')).toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText('Remove')[0]);

    await waitFor(() => {
      expect(screen.queryByText('Story 1')).not.toBeInTheDocument();
      expect(screen.getByText('Story 2')).toBeInTheDocument();
    });
  });
});
