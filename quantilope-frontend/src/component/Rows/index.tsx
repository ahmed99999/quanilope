import React, { useEffect, useState } from 'react';
import { RowIdentifier, RowRequest } from '../../type';
import RowComponent from '../../component/Row';
import RowContainer from '../../container/Row';

interface Props {
  onLoad?: () => Promise<RowIdentifier[]>;
  onCreate?: (row: RowRequest) => Promise<RowIdentifier>;
  onDelete?: (id: string) => Promise<string>;
}

const Row = RowContainer(RowComponent);

const Rows = ({
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
  onDelete = async () => '',
}: Props) => {
  const [rows, setRows] = useState<RowIdentifier[]>([]);

  useEffect(() => {
    const getRows = async () => {
      const rows = await onLoad();
      setRows(rows);
    };

    getRows();
  }, [onLoad]);

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

  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <Row
            key={row._id}
            row={row}
            numberOfColumns={2}
            onDelete={deleteRow}
          />
        ))}
        <tr>
          <td onClick={() => createRow({ name: 'row2', image: '' })}>
            <button>+</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Rows;
export type { Props };
