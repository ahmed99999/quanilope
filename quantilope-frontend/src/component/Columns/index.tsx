import React, { useEffect, useState } from 'react';
import { ColumnIdentifier, ColumnRequest } from '../../type';
import ColumnComponent from '../../component/ColumnBody';
import ColumnContainer from '../../container/Column';

import ColumnHeader from '../../component/ColumnHeader';

interface Props {
  onLoad?: () => Promise<ColumnIdentifier[]>;
  onCreate: (column: ColumnRequest) => Promise<ColumnIdentifier>;
  onDelete?: (id: string) => Promise<string>;
}

const Column = ColumnContainer(ColumnComponent);

const Columns = ({
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
  onDelete = async () => '',
}: Props) => {
  const [columns, setColumns] = useState<ColumnIdentifier[]>([]);

  useEffect(() => {
    const getColumns = async () => {
      const columns = await onLoad();
      setColumns(columns);
    };

    getColumns();
  }, [onLoad]);

  const deleteColumn = async (rowId: string) => {
    const deletedColumnId = await onDelete(rowId);
    const newColumns = columns.filter(
      (column) => column._id !== deletedColumnId
    );
    setColumns(newColumns);
  };

  return (
    <>
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
    </>
  );
};

export default Columns;
export type { Props };
