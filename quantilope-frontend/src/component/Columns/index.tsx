import React, { useEffect, useState, useContext } from 'react';
import { SummaryContext } from '../../context';

import { ColumnIdentifier, ColumnRequest } from '../../type';

import ColumnHeader from '../../component/ColumnHeader';

import ColumnComponent from '../../component/ColumnBody';
import ColumnContainer from '../../container/Column';

import RowsComponent from '../../component/Rows';
import RowsContainer from '../../container/Rows';

interface Props {
  onLoad?: () => Promise<ColumnIdentifier[]>;
  onCreate: (column: ColumnRequest) => Promise<ColumnIdentifier>;
  onDelete?: (id: string) => Promise<string>;
}

const Rows = RowsContainer(RowsComponent);
const Column = ColumnContainer(ColumnComponent);

const Columns = ({
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
  onDelete = async () => '',
}: Props) => {
  const { summary, setSummary } = useContext(SummaryContext);
  const [columns, setColumns] = useState<ColumnIdentifier[]>([]);

  useEffect(() => {
    const getColumns = async () => {
      const columns = await onLoad();
      setSummary({ ...summary, columnsNumber: columns.length });
      setColumns(columns);
    };

    getColumns();
  }, []);

  const deleteColumn = async (rowId: string) => {
    const deletedColumnId = await onDelete(rowId);
    const newColumns = columns.filter(
      (column) => column._id !== deletedColumnId
    );
    setColumns(newColumns);
  };

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          {columns.map((column) => (
            <ColumnHeader key={column._id} columnImage={column.image || ''} />
          ))}
          <td>
            <button onClick={() => onCreate({ name: 'col2', image: '' })}>
              +
            </button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          {columns.map((column) => (
            <Column key={column._id} column={column} onDelete={deleteColumn} />
          ))}
        </tr>
        <Rows numberOfColumns={columns.length} />
      </tbody>
    </table>
  );
};

export default Columns;
export type { Props };
