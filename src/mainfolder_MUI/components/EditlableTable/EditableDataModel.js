/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import '../../../Styles/EditableTable.css';

export default function ValidateRowModelControlGrid() {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/stories')
      .then(response => {
        // console.log('Fetched data:', response.data); 
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditRowsModelChange = React.useCallback((newModel) => {
    const updatedModel = { ...newModel };
    Object.keys(updatedModel).forEach((id) => {
      if (updatedModel[id].num_comments) {
        const isValid = !isNaN(updatedModel[id].num_comments.value) && Number.isInteger(Number(updatedModel[id].num_comments.value));
        updatedModel[id].num_comments = { ...updatedModel[id].num_comments, error: !isValid };
      }
      if (updatedModel[id].points) {
        const isValid = !isNaN(updatedModel[id].points.value) && Number.isInteger(Number(updatedModel[id].points.value));
        updatedModel[id].points = { ...updatedModel[id].points, error: !isValid };
      }
    });
    setEditRowsModel(updatedModel);
  }, []);

  const processRowUpdate = async (newRow) => {
    try {
      const response = await axios.put(`http://localhost:8000/stories/${newRow.id}`, newRow);
      return response.data;
    } catch (error) {
      console.error('Failed to update row', error);
      throw error;
    }
  };

  const renderTitleCell = (params) => {
    return (
      <a style={{ color: '#249493' }} href={params.row.url} target="_blank" rel="noopener noreferrer">
        {params.value}
      </a>
    );
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 210, editable: false, renderCell: renderTitleCell, cellClassName: 'centered-cell' },
    { field: 'author', headerName: 'Author', width: 280, editable: false, cellClassName: 'centered-cell' },
    { field: 'num_comments', headerName: 'No.of Comments', width: 200, editable: true, type: 'number', cellClassName: 'centered-cell' },
    { field: 'points', headerName: 'Points', width: 200, editable: true, type: 'number', cellClassName: 'centered-cell' },
    { field: 'postedOn', headerName: 'Posted On', width: 210, editable: false, cellClassName: 'centered-cell' },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15]}
      editRowsModel={editRowsModel}
      onEditRowsModelChange={handleEditRowsModelChange}
      processRowUpdate={processRowUpdate}
      sx={{
        columnHeader: 'centered-header',
        cell: 'centered-cell',
      }}
    />
  );
}
