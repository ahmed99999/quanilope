import React from 'react';
import { Summary } from '../../type';

interface Props {
  summary: Summary;
}

const SummaryComponent = ({ summary }: Props) => (
  <div>
    <div>{`Number Of Rows: ${summary.rowsNumber}`}</div>
    <div>{`Number Of Columns: ${summary.columnsNumber}`}</div>
    <div>{`Number Of images Uploaded: ${summary.imagesNumber}`}</div>
    <div>{`Longest Row Label: ${summary.longestRow}`}</div>
    <div>{`Longest Column Label: ${summary.longestColumn}`}</div>
  </div>
);

export default SummaryComponent;
export type { Props };
