import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../Styles/Reports.css';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as XLSX from 'xlsx';

function Reports() {
    const [searchTerm, setSearchTerm] = useState('');
    const [stories, setStories] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const filteredStoriesCount = filteredStories.length;

    const columns = [
        { field: 'title', headerName: 'Title', width: 350,headerClassName: 'super-app-theme--header'},
        { field: 'author', headerName: 'Author', width: 250 },
        { field: 'points', headerName: 'Points', width: 150 },
        { field: 'num_comments', headerName: 'Comments', width: 150 },
        { field: 'postedOn', headerName: 'Posted On', width: 200 },
    ];

    const exportToExcel = (data, fileName) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    const handleExportSelected = () => {
        const selectedRows = rowSelectionModel.map(id => filteredStories.find(story => story.id === id));
        exportToExcel(selectedRows, 'selected_stories');
    };

    const handleExportAll = () => {
        exportToExcel(filteredStories, 'all_stories');
    };

    return (
        <>
            <Navbar />
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
                <hr />
            </div>
            <div className='TableHeading'>
                <p style={{ fontSize: "12px" }}>Filtered Story Count: {filteredStoriesCount}/{storyCount}</p>
                <div>
                    <Button
                        id="basic-button"
                        className='ExportMenu'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >☰</Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { handleExportSelected(); handleClose(); }}>Export selected</MenuItem>
                        <MenuItem onClick={() => { handleExportAll(); handleClose(); }}>Export all</MenuItem>
                    </Menu>
                </div>
            </div>
            <ul className='listItems'>
                {filteredStories.length !== 0
                    ? <div style={{ height: 370, width: '96%', marginLeft: '4px' }}>
                        <DataGrid
                            rows={filteredStories}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15]}
                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                        />
                    </div>
                    : <h1 style={{ textAlign: "center", color: "red" }}>No Match Found</h1>
                }
            </ul>
        </>
    );
}

export default Reports;
