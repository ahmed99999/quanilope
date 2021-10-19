import React, { useEffect, useState, useContext } from 'react';
import { SummaryContext } from '../../context';
import { RowIdentifier, RowRequest } from '../../type';

import RowComponent from '../../component/Row';
import RowContainer from '../../container/Row';

interface Props {
  numberOfColumns: number;
  onLoad?: () => Promise<RowIdentifier[]>;
  onCreate?: (row: RowRequest) => Promise<RowIdentifier>;
  onDelete?: (id: string) => Promise<string>;
}

const Row = RowContainer(RowComponent);

const Rows = ({
  numberOfColumns,
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
  onDelete = async () => '',
}: Props) => {
  const { summary, setSummary } = useContext(SummaryContext);

  const [rows, setRows] = useState<RowIdentifier[]>([]);

  useEffect(() => {
    const getRows = async () => {
      const rows = await onLoad();
      setSummary({ ...summary, rowsNumber: rows.length });
      setRows(rows);
    };

    getRows();
  }, []);

  const createRow = async (row: RowRequest) => {
    const newRow = await onCreate(row);
    if (newRow._id === '') return;
    const newRows = rows.concat([newRow]);
    setRows(newRows);
  };

  const deleteRow = async (rowId: string) => {
    const deletedRowId = await onDelete(rowId);
    const newRows = rows.filter((row) => row._id !== deletedRowId);
    setRows(newRows);
  };

  console.log('rows');

  return (
    <>
      {rows.map((row) => (
        <Row
          key={row._id}
          row={row}
          numberOfColumns={numberOfColumns}
          onDelete={deleteRow}
        />
      ))}
      <tr>
        <td onClick={() => createRow({ name: 'row2', image: '' })}>
          <button>+</button>
        </td>
      </tr>
    </>
  );
};

export default Rows;
export type { Props };
