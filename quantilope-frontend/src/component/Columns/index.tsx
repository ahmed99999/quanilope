import React, { useEffect, useState, useContext } from 'react';
import { SummaryContext } from '../../context';

import { ColumnIdentifier, ColumnRequest } from '../../type';
import style from './style.module.scss';
import plus from '../../img/plus.png';
import minus from '../../img/minus.png';

import ColumnHeader from '../../component/ColumnHeader';

import ColumnComponent from '../../component/Column';
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
      const newSummary = { ...summary, columnsNumber: columns.length };
      setSummary(newSummary);
      setColumns(columns);
    };

    getColumns();
  }, []);

  const createColumn = async (row: ColumnRequest) => {
    const newColumn = await onCreate(row);
    if (newColumn._id === '') return;
    const newColumns = columns.concat([newColumn]);
    setColumns(newColumns);
  };

  const deleteColumn = async (rowId: string) => {
    const deletedColumnId = await onDelete(rowId);
    const newColumns = columns.filter(
      (column) => column._id !== deletedColumnId
    );
    setColumns(newColumns);
  };

  return (
    <table className={style.root}>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          {columns.map((column) => (
            <ColumnHeader key={column._id} column={column} />
          ))}
          <td>
            <img
              onClick={() => createColumn({ name: 'col2', image: '' })}
              src={plus}
              alt='...'
              className={style.img}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          {columns.map((column) => (
            <Column key={column._id} column={column} />
          ))}
        </tr>
        <Rows numberOfColumns={columns.length} />
        <tr>
          <td></td>
          <td></td>
          {columns.map((column) => (
            <td key={column._id}>
              <img
                onClick={() => deleteColumn(column._id)}
                src={minus}
                alt='...'
                className={style.img}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Columns;
export type { Props };
