import React from 'react';
import RowsComponent from '../../component/Rows';
import RowsContainer from '../../container/Rows';

const Rows = RowsContainer(RowsComponent);
const App = () => {
  return (
    <div className='App'>
      <Rows />
    </div>
  );
};

export default App;
