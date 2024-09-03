import React, { useState, useEffect } from 'react';
import '../Styles/ScopedSearch.css';

const ScopedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownValue, setDropdownValue] = useState('all');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  useEffect(() => {
    filterBooks();
    // eslint-disable-next-line
  }, [searchTerm, dropdownValue]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filterBooks = () => {
    let filtered = books;

    if (dropdownValue !== 'all') {
      filtered = filtered.filter(book => book.category.toLowerCase() === dropdownValue.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.writer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search book by name or writer"
          className="search-input-scoped"
        />
        <button
          onClick={clearSearch}
          className="cancel-btn"
        >
          x
        </button>
        <span> | </span> 
        <select
          value={dropdownValue}
          onChange={handleDropdownChange}
          className="dropdown"
        >
          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="science fiction">Science Fiction</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </div>
      {filteredBooks.length === 0 ? (
        <h1 className="no-books">No books found</h1>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Writer</th>
              <th>Year</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.writer}</td>
                <td>{book.year}</td>
                <td>{book.category}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScopedSearch;
