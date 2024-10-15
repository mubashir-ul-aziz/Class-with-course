import React, { useState } from 'react';
import ClassList from './components/ClassList';

function App() {
  const [classes, setClasses] = useState([]);

  return (
    <div className="App app-comp">
      <h1>Class Portal</h1>
      <ClassList 
        classes={classes} 
        setClasses={setClasses} 
      />
    </div>
  );
}

export default App;
