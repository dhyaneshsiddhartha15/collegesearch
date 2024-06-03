import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ college }) => {
  const [logo, setLogo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (college) {
      const fetchLogo = async () => {
        try {
          const response = await axios.get(`https://logo.clearbit.com/${college.domains[0]}`);
          setLogo(response.config.url);
          setError(null);
        } catch (error) {
          try {
            const fallbackResponse = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://logo.clearbit.com/${college.domains[0]}`)}`);
            if (fallbackResponse.data.contents) {
              setLogo(`data:image/png;base64,${btoa(fallbackResponse.data.contents)}`);
              setError(null);
            } else {
              throw new Error('Logo not found');
            }
          } catch (fallbackError) {
            return <div className="text-center text-gray-600">Logo Not Found.</div>;
            setError('Logo not found');
          }
        }
      };

      fetchLogo();
    }
  }, [college]);

  if (!college) {
    return <div className="text-center text-gray-600">Please select a college.</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold text-gray-800 mb-4">{college.name}</h1>
      {logo ? (
        <img src={logo} alt={`${college.name} logo`} className="w-24 h-24 mx-auto" />
      ) : (
        <div className="text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Dashboard;
