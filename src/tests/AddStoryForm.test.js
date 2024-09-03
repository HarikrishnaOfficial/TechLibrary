/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddStoryForm from '../Components/AddStoryForm.js';
import axios from 'axios';
jest.mock('axios');

describe('AddStoryForm Component', () => {
    test('renders form inputs correctly', () => {
        render(
            <Router>
                <AddStoryForm />
            </Router>
        );

        expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/URL:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Author:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comments:/i)).toBeInTheDocument();
    });

    test('shows error messages on invalid input', () => {
        render(
            <Router>
                <AddStoryForm />
            </Router>
        );

        fireEvent.click(screen.getByText(/Submit/i));

        expect(screen.getByText(/Title is required./i)).toBeInTheDocument();
        expect(screen.getByText(/URL is not valid./i)).toBeInTheDocument();
        expect(screen.getByText(/Author is required./i)).toBeInTheDocument();
        expect(screen.getByText(/Number of comments is required./i)).toBeInTheDocument();
        expect(screen.getByText(/Points are required./i)).toBeInTheDocument();
    });

    test('form submission', async () => {
        render(
            <Router>
                <AddStoryForm />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText(/URL:/i), { target: { value: 'http://test.com' } });
        fireEvent.change(screen.getByLabelText(/Author:/i), { target: { value: 'Test Author' } });
        fireEvent.change(screen.getByLabelText(/Comments:/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Points:/i), { target: { value: '10' } });

        axios.post.mockResolvedValue({ status: 200 });
        window.alert = jest.fn();

        fireEvent.click(screen.getByText(/Submit/i));

        expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/stories", expect.any(Object));
        window.alert = jest.fn(() => true);
    });



    test('navigates to home on cancel', () => {
        const { container } = render(
            <Router>
                <AddStoryForm />
            </Router>
        );

        window.confirm = jest.fn(() => true); // Mock window.confirm to always return true

        fireEvent.click(screen.getByText(/Cancel/i));
    });
});
