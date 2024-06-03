
import React, { useState } from 'react';
import CollegeSelector from './components/CollegeSelector';
import Dashboard from './components/Dashboard';

import  {Header}  from './components/Header';


const App = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);

  return (
    <div className="App">
  <Header/>
      <CollegeSelector onSelectCollege={setSelectedCollege} />
      <Dashboard college={selectedCollege} />
    </div>
  );
};

export default App;
