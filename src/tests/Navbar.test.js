
/**
 * @jest-environment jsdom
 */


import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Components/Navbar';

describe('Navbar Component', () => {
    test('renders navigation links correctly', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        // Checking if the logo is rendered
        expect(screen.getByText('Tech Library')).toBeInTheDocument();

        // Checking if all navigation links are rendered
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Add New Story')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('| Material-UI')).toBeInTheDocument();
        expect(screen.getByText('| Scoped Search')).toBeInTheDocument();
    });

    test('navigation links point to correct routes', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Add New Story').closest('a')).toHaveAttribute('href', '/addStory');
        expect(screen.getByText('About Us').closest('a')).toHaveAttribute('href', '/aboutUs');
        expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute('href', '/contactUs');
        expect(screen.getByText('| Material-UI').closest('a')).toHaveAttribute('href', '/materialUI');
        expect(screen.getByText('| Scoped Search').closest('a')).toHaveAttribute('href', '/scopedSearch');
    });
});
