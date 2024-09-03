
/**
 * @jest-environment jsdom
 */


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScopedSearch from '../Components/ScopedSearch';

describe("ScopedSearch Component", () => {
    test('renders input and dropdown correctly', () => {
        render(
            <Router>
                <ScopedSearch />
            </Router>
        );

        expect(screen.getByPlaceholderText(/Search book by name or writer/i)).toBeInTheDocument();
        expect(screen.getByText(/All/i)).toBeInTheDocument();
    });

    test('updates search term on input change', () => {
        render(
            <Router>
                <ScopedSearch />
            </Router>
        );

        const searchInput = screen.getByPlaceholderText(/Search book by name or writer/i);
        fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });

        expect(searchInput.value).toBe('Harry Potter');
    });

    test('updates dropdown value on change', () => {
        render(
            <Router>
                <ScopedSearch />
            </Router>
        );

        const dropdown = screen.getByText(/All/i).closest('select');
        fireEvent.change(dropdown, { target: { value: 'fiction' } });

        expect(dropdown.value).toBe('fiction');
    });

    test('clears search term on clear button click', () => {
        render(
            <Router>
                <ScopedSearch />
            </Router>
        );

        const searchInput = screen.getByPlaceholderText(/Search book by name or writer/i);
        const clearButton = screen.getByText('x');

        fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
        fireEvent.click(clearButton);

        expect(searchInput.value).toBe('');
    });

    test('filters books based on search term and dropdown value', async () => {
        const mockBooks = [
            { name: "To Kill a Mockingbird", writer: "Harper Lee", year: 1960, category: "Fiction", price: 10.99 },
            { name: "1984", writer: "George Orwell", year: 1949, category: "Fiction", price: 8.99 },
            { name: "Sapiens: A Brief History of Humankind", writer: "Yuval Noah Harari", year: 2011, category: "Non-Fiction", price: 14.99 },
            { name: "Educated", writer: "Tara Westover", year: 2018, category: "Non-Fiction", price: 12.99 },
            { name: "Dune", writer: "Frank Herbert", year: 1965, category: "Science Fiction", price: 9.99 },
            { name: "Neuromancer", writer: "William Gibson", year: 1984, category: "Science Fiction", price: 7.99 },
            { name: "The Hobbit", writer: "J.R.R. Tolkien", year: 1937, category: "Fantasy", price: 11.99 },
            { name: "Harry Potter and the Sorcerer's Stone", writer: "J.K. Rowling", year: 1997, category: "Fantasy", price: 10.49 },
            { name: "The Great Gatsby", writer: "F. Scott Fitzgerald", year: 1925, category: "Fiction", price: 10.99 },
            { name: "The Catcher in the Rye", writer: "J.D. Salinger", year: 1951, category: "Fiction", price: 9.99 },
            { name: "Becoming", writer: "Michelle Obama", year: 2018, category: "Non-Fiction", price: 16.99 },
            { name: "The Road", writer: "Cormac McCarthy", year: 2006, category: "Fiction", price: 12.99 }
        ];
    
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockBooks),
            })
        );
    
        // Render the component
        render(
            <Router>
                <ScopedSearch />
            </Router>
        );
    
        // Find the search input and dropdown elements
        const searchInput = await waitFor(() => screen.getByPlaceholderText(/Search book by name or writer/i));
        const dropdown = await waitFor(() => screen.getByText(/All/i).closest('select'));
        fireEvent.change(dropdown, { target: { value: 'fantasy' } });
        fireEvent.change(searchInput, { target: { value: 'harry' } });
    
        // Wait for the filtered results to render on screen
        await waitFor(() => {
            const filteredBooks = screen.getAllByRole('row');
            expect(filteredBooks).toHaveLength(2); // Including header row
        });
    
        global.fetch.mockRestore();
    });
});
