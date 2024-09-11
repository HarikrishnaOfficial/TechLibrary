import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoriesTable from './StoriesTable';
import ReactPaginate from 'react-paginate';

function StoriesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [storiesPerPage,setStoriesPerPage] = useState(5); // number to set stories per page

  const storyCount = stories.length;

  async function getStories() {
    try {
      const response = await axios.get("http://localhost:8000/stories");
      setStories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getStories();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Pagination logic
  const indexOfLastStory = (currentPage + 1) * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  //filtering logic
  const pagefilteredStories = currentStories.filter(({ title, author, postedOn }) => {
    const matchesSearchTerm =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.toLowerCase().includes(searchTerm.toLowerCase());

    const postedOnDate = new Date(postedOn);
    const startDateFilter = startDate ? new Date(startDate) : null;
    const endDateFilter = endDate ? new Date(endDate) : null;

    const matchesDateRange = (!startDateFilter || postedOnDate >= startDateFilter) &&
      (!endDateFilter || postedOnDate <= endDateFilter);
    return matchesSearchTerm && matchesDateRange;
  });

  const TotalStoriesCount = stories.length;
  const pageStoriesFilterCount = pagefilteredStories.length;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure to remove?")) {
      try {
        await axios.delete(`http://localhost:8000/stories/${id}`);
        const updatedStories = stories.filter((story) => story.id !== id);
        setStories(updatedStories);
      } catch (error) {
        console.error("There was an error deleting the story!", error);
      }
    }
  };

  const handleUpdate = (updatedStory) => {
    const updatedStories = stories.map(story =>
      story.id === updatedStory.id ? updatedStory : story
    );
    setStories(updatedStories);
  };

  const handleChange = (event) => {
    setStoriesPerPage(event.target.value);
  };

  return (
    <>
      <div>
        <div className='searchTermsCont'>
          <div style={{ marginTop: "15px" }}>
            <label className='inputLabel' htmlFor='searchInput'>Search: </label>
            <input
              className="search-input"
              type="text"
              id='searchInput'
              placeholder="Search by Title or Author"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label className='inputLabel' htmlFor='startDate'>From Date(yyyy-mm-dd): </label>
            <input
              className="search-input"
              type="date"
              placeholder='Filter Records From Date'
              id='startDate'
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label className='inputLabel' htmlFor='endDate'>To Date(yyyy-mm-dd): </label>
            <input
              className="search-input"
              type="date"
              placeholder='Filter Records To Date'
              id='endDate'
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>

        <div className='recordCountContainer'>
          <p>Searching For: <span className='searchText'>{searchTerm}</span></p>
          <p>Total Story Count: {storyCount}</p>
        </div>
        <hr/>
      </div>
      <div className='filterdcountsectionCont'>
        <div className='numofrecordsdropdown'>
          <label htmlFor="recordsPerPage">No.of records per page:</label>&nbsp;
          <select className='dropdown' id="recordsPerPage" value={storiesPerPage} onChange={handleChange}>
            <option selected value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        {/* <div>
          <p>Showing {(currentPage * storiesPerPage) + 1} to {
            ((currentPage + 1) * storiesPerPage) < TotalStoriesCount
              ? ((currentPage + 1) * storiesPerPage)
              : TotalStoriesCount
          } Records
          </p>
        </div> */}
        <div>
          <p>Filtered Story Count: {pageStoriesFilterCount}/{currentStories.length}</p>
        </div>
      </div>
      <ul className='listItems'>
        {pagefilteredStories.length !== 0
          ? <StoriesTable
            stories={pagefilteredStories}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
          : <h1 style={{ textAlign: "center", color: "red" }}>No Match Found</h1>
        }
      </ul>
      <div className="pagination">
        {pagefilteredStories.length !== 0 && <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={null}
          pageCount={Math.ceil(TotalStoriesCount / storiesPerPage)}
          marginPagesDisplayed={0}
          pageRangeDisplayed={0}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />}
      </div>
    </>
  );
}

export default StoriesList;