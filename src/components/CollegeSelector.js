import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const CollegeSelector = ({ onSelectCollege }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://universities.hipolabs.com/search');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto mt-6">
      <Autocomplete
        options={colleges}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => onSelectCollege(value)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select College"
            variant="outlined"
            fullWidth
            className="shadow-md"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        className="w-full"
      />
    </div>
  );
};

export default CollegeSelector;
