import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoriesTable from './StoriesTable';

function StoriesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const filteredStories = stories.filter(({ title, author, postedOn }) => {
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
  let filteredStoriesCount = (filteredStories.length);


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

  return (
    <>
      <div>
        <div className='searchTermsCont'>
          <div style={{marginTop:"15px"}}>
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
          <div style={{marginTop:"15px"}}>
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
          <div style={{marginTop:"15px"}}>
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
        <hr />
      </div>
      <p style={{ textAlign: "end", fontSize: "12px", marginRight: "50px" }}>Filtered Story Count: {filteredStoriesCount}/{storyCount}</p>
      <ul className='listItems'>
        {filteredStories.length !== 0
          ? <StoriesTable
            stories={filteredStories}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
          : <h1 style={{ textAlign: "center", color: "red" }}>No Match Found</h1>
        }
      </ul>
    </>
  );
}
export default StoriesList;