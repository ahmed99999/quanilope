import React, { useState } from 'react';
import { SummaryContext } from '../../context';
import { Summary } from '../../type';

import SummaryComponent from '../../component/Summary';

import ColumnsComponent from '../../component/Columns';
import ColumnsContainer from '../../container/Columns';

const Columns = ColumnsContainer(ColumnsComponent);
const App = () => {
  const [summary, setSummary] = useState<Summary>({
    rowsNumber: 0,
    columnsNumber: 0,
    imagesNumber: 0,
    longestRow: '',
    longestColumn: '',
  });

  return (
    <SummaryContext.Provider value={{ summary, setSummary }}>
      <div className='row'>
        <div className='col-6'>
          <Columns />
        </div>
        <div className='col-6'>
          <SummaryComponent summary={summary} />
        </div>
      </div>
    </SummaryContext.Provider>
  );
};

export default App;
