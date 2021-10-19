import { createContext } from 'react';
import { Summary } from '../../type';

interface SummaryType {
  summary: Summary;
  setSummary: (summary: Summary) => void;
}

const summary: Summary = {
  rowsNumber: 0,
  columnsNumber: 0,
  imagesNumber: 0,
  longestRow: '',
  longestColumn: '',
};

const SummaryContext = createContext<SummaryType>({
  summary,
  setSummary: () => {},
});

export { SummaryContext };
export type { SummaryType };
