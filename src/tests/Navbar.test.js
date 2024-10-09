
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
        expect(screen.getByText('Add Story')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('MUI')).toBeInTheDocument();
        expect(screen.getByText('Scoped Search')).toBeInTheDocument();
    });

    test('navigation links point to correct routes', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home');
        expect(screen.getByText('Add Story').closest('a')).toHaveAttribute('href', '/addStory');
        expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/aboutUs');
        expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute('href', '/contactUs');
        expect(screen.getByText('MUI').closest('a')).toHaveAttribute('href', '/materialUI');
        expect(screen.getByText('Scoped Search').closest('a')).toHaveAttribute('href', '/scopedSearch');
    });
});
