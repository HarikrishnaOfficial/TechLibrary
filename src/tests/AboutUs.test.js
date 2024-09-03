
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../Components/AboutUs';

describe('AboutUs Component', () => {
  test('renders AboutUs component with correct content', () => {
    render(<AboutUs />);

    const headingElement = screen.getByText(/About Our Company/i);
    expect(headingElement).toBeInTheDocument();

    const firstParagraph = screen.getByText(/Welcome to Hey Tech! We are passionate about providing information about the details of technologies./i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/Our journey began in 2024. Since then, we've been committed to give details of technologies./i);
    expect(secondParagraph).toBeInTheDocument();

    const thirdParagraph = screen.getByText(/We strive to Add technologies, filetr technologies ./i);
    expect(thirdParagraph).toBeInTheDocument();
  });
});
