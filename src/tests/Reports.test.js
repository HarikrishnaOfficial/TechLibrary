/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Reports from '../Components/Reports';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Reports Component', () => {
    test('renders Reports component with correct initial content', async () => {
        axios.get.mockResolvedValue({ data: [] });

        render(<Router>
            <Reports />
        </Router>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

        // Check if the DataGrid component is rendered
        // expect(screen.getByRole('grid')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /☰/i })).toBeInTheDocument();
    });

    test('handles search input change', () => {
        render(<Router>
            <Reports />
        </Router>
        );

        const searchInput = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchInput, { target: { value: 'test' } });

        expect(searchInput.value).toBe('test');
    });

    test('handles date input changes', () => {
        render(<Router>
            <Reports />
        </Router>
        );

        const startDateInput = screen.getByLabelText(/From Date/i);
        const endDateInput = screen.getByLabelText(/To Date/i);

        fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-12-31' } });

        expect(startDateInput.value).toBe('2024-01-01');
        expect(endDateInput.value).toBe('2024-12-31');
    });

    test('fetches and displays stories', async () => {
        // Mock the axios response with sample data
        const mockStories = [
            { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2024-01-01' },
            { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2024-02-01' },
        ];
        axios.get.mockResolvedValue({ data: mockStories });

        render(<Router>
            <Reports />
        </Router>
        );

        // Wait for the stories to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText(/Story 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Story 2/i)).toBeInTheDocument();
        });
    });

    test('filters stories based on search term and date range', async () => {
        // Mock the axios response with sample data
        const mockStories = [
            { id: 1, title: 'Story 1', author: 'Author 1', postedOn: '2024-01-01' },
            { id: 2, title: 'Story 2', author: 'Author 2', postedOn: '2024-02-01' },
        ];
        axios.get.mockResolvedValue({ data: mockStories });

        render(<Router>
            <Reports />
        </Router>
        );

        // Wait for the stories to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText(/Story 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Story 2/i)).toBeInTheDocument();
        });

        // Filter by search term
        const searchInput = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchInput, { target: { value: 'Story 1' } });

        expect(screen.queryByText(/Story 2/i)).not.toBeInTheDocument();

        // Filter by date range
        const startDateInput = screen.getByLabelText(/From Date/i);
        const endDateInput = screen.getByLabelText(/To Date/i);

        fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });

        expect(screen.queryByText(/Story 2/i)).not.toBeInTheDocument();
    });

    test('handles export menu actions', () => {
        render(<Router>
            <Reports />
        </Router>
        );

        const exportButton = screen.getByRole('button', { name: /☰/i });
        fireEvent.click(exportButton);

        const exportSelected = screen.getByText(/Export selected/i);
        const exportAll = screen.getByText(/Export all/i);

        expect(exportSelected).toBeInTheDocument();
        expect(exportAll).toBeInTheDocument();

        fireEvent.click(exportSelected);
        fireEvent.click(exportAll);
    });
});
