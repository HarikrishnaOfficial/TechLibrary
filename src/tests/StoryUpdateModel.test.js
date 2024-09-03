/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryUpdateModal from '../Models/StoryUpdateModal';
import Modal from 'react-modal';

Modal.setAppElement(document.body); 

const mockStory = {
  id: 1,
  title: 'Test Title',
  url: 'http://test.com',
  author: 'Test Author',
  num_comments: '10',
  points: '10',
  postedOn: '2024-08-22'
};

const mockOnUpdate = jest.fn();
const mockOnRequestClose = jest.fn();

test('verify the validatations of StoryUpdateModal',()=>{
  render(
    <StoryUpdateModal
      isOpen={true}
      onRequestClose={mockOnRequestClose}
      story={mockStory}
      onUpdate={mockOnUpdate}
    />
  );

  fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: '' } });
  expect(screen.getByLabelText(/Title:/i).value).toBe('');
  fireEvent.change(screen.getByLabelText(/URL:/i), { target: { value: '' } });
  expect(screen.getByLabelText(/URL:/i).value).toBe('');
  fireEvent.change(screen.getByLabelText(/Author:/i), { target: { value: '' } });
  expect(screen.getByLabelText(/Author:/i).value).toBe('');
  fireEvent.change(screen.getByLabelText(/Comments:/i), { target: { value: '' } });
  expect(screen.getByLabelText(/Comments:/i).value).toBe('');
  fireEvent.change(screen.getByLabelText(/Points:/i), { target: { value: '' } });
  expect(screen.getByLabelText(/Points:/i).value).toBe('');

  fireEvent.click(screen.getByText(/Save/i));
  expect(screen.getByText(/Title is required./i)).toBeInTheDocument();
  expect(screen.getByText(/URL is not valid./i)).toBeInTheDocument();
  expect(screen.getByText(/Author is required./i)).toBeInTheDocument();
  expect(screen.getByText(/Number of comments is required./i)).toBeInTheDocument();
  expect(screen.getByText(/Points are required./i)).toBeInTheDocument();
})

test('renders StoryUpdateModal and handles form submission', () => {
  render(
    <StoryUpdateModal
      isOpen={true}
      onRequestClose={mockOnRequestClose}
      story={mockStory}
      onUpdate={mockOnUpdate}
    />
  );

  expect(screen.getByLabelText(/Title:/i).value).toBe(mockStory.title);
  expect(screen.getByLabelText(/URL:/i).value).toBe(mockStory.url);
  expect(screen.getByLabelText(/Author:/i).value).toBe(mockStory.author);
  expect(screen.getByLabelText(/Comments:/i).value).toBe(mockStory.num_comments);
  expect(screen.getByLabelText(/Points:/i).value).toBe(mockStory.points);
  expect(screen.getByLabelText(/Posted On:/i).value).toBe(mockStory.postedOn);

  fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Updated Title' } });
  expect(screen.getByLabelText(/Title:/i).value).toBe('Updated Title');

  fireEvent.click(screen.getByText(/Save/i));

  expect(mockOnUpdate).toHaveBeenCalledWith({
    ...mockStory,
    title: 'Updated Title'
  });

  fireEvent.click(screen.getByText(/Cancel/i));
  expect(mockOnRequestClose).toHaveBeenCalled();
});
