import React, { useState } from 'react';
import { RowIdentifier, RowRequest } from '../../type';

interface Props {
  row: RowIdentifier;
  columnsNumber: number;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, row: RowRequest) => Promise<RowIdentifier>;
}

const Row = ({
  row: currentRow,
  columnsNumber,
  onDelete = async () => null,
  onUpdate = async () => ({ _id: '', name: '' }),
}: Props) => {
  const [row, setRow] = useState<RowIdentifier>(currentRow);
  const [focus, setFocus] = useState<boolean>(false);

  const { _id, image, name } = row;
  const arrayOfDots = [];
  for (let index = 1; index <= columnsNumber; index++) {
    arrayOfDots.push(index);
  }

  const updateRow = async (_id: string, name: string, keyCode: string) => {
    if (keyCode !== 'Enter') return;
    const updatedRow = await onUpdate(_id, { name });
    setRow(updatedRow);
    setFocus(false);
  };

  //   const onFocus = () => {};

  return (
    <tr>
      <td>
        {!image && <button>+</button>}
        {image && <img src={image} alt='...' />}
      </td>
      <td onBlur={() => setFocus(true)}>
        {!focus && <span>{name}</span>}
        {focus && (
          <input
            value={name}
            onKeyUp={(e) => updateRow(_id, e.currentTarget.value, e.key)}
          />
        )}
      </td>
      {arrayOfDots.map((element) => (
        <td key={element}>{'O'}</td>
      ))}
      <td onClick={() => onDelete(_id)}>
        <button>-</button>
      </td>
    </tr>
  );
};

export default Row;
export type { Props };
