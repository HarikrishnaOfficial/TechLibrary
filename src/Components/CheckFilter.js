import React, { useState, useEffect } from 'react';
import "../Styles/CheckFilter.css";
import Navbar from './Navbar';

const CheckFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkboxValues, setCheckboxValues] = useState(["all", "fiction", "non-fiction", "science fiction", "fantasy"]);
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
  }, [searchTerm, checkboxValues]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (value === "all") {
      if (event.target.checked) {
        setCheckboxValues(["all", "fiction", "non-fiction", "science fiction", "fantasy"]);
      } else {
        setCheckboxValues([]);
      }
    } else {
      setCheckboxValues((prevValues) => {
        const newValues = prevValues.includes(value)
          ? prevValues.filter((v) => v !== value)
          : [...prevValues, value];

        if (newValues.length === 4) {
          newValues.push("all");
        } else if (newValues.includes("all")) {
          newValues.splice(newValues.indexOf("all"), 1);
        }
        return newValues;
      });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filterBooks = () => {
    let filtered = books;

    if (checkboxValues.length > 0 && !checkboxValues.includes("all")) {
      filtered = filtered.filter(book => checkboxValues.includes(book.category.toLowerCase()));
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
    <>
    <Navbar/>
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
      </div>
      <div className='checkContainer'>
        <label>
          <input
            type="checkbox"
            value="all"
            checked={checkboxValues.includes("all")}
            onChange={handleCheckboxChange}
          />
          All
        </label>
        <label>
          <input
            type="checkbox"
            value="fiction"
            checked={checkboxValues.includes("fiction")}
            onChange={handleCheckboxChange}
          />
          Fiction
        </label>
        <label>
          <input
            type="checkbox"
            value="non-fiction"
            checked={checkboxValues.includes("non-fiction")}
            onChange={handleCheckboxChange}
          />
          Non-Fiction
        </label>
        <label>
          <input
            type="checkbox"
            value="science fiction"
            checked={checkboxValues.includes("science fiction")}
            onChange={handleCheckboxChange}
          />
          Science Fiction
        </label>
        <label>
          <input
            type="checkbox"
            value="fantasy"
            checked={checkboxValues.includes("fantasy")}
            onChange={handleCheckboxChange}
          />
          Fantasy
        </label>
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
    </>
  );
};

export default CheckFilter;
