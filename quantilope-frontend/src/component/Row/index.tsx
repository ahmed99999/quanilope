import React, { useState } from 'react';
import { RowIdentifier, RowRequest } from '../../type';

import ImageUploadComponent from '../../component/ImageUpload';
import ImageUploadContainer from '../../container/ImageUpload';

interface Props {
  row: RowIdentifier;
  columnsNumber: number;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, row: RowRequest) => Promise<RowIdentifier>;
}

const ImageUpload = ImageUploadContainer(ImageUploadComponent);

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

  const onUpdateState = (row: RowIdentifier) => setRow(row);

  const onChange = (value: string) => setRow({ _id: row._id, name: value });

  return (
    <tr>
      <td>
        <ImageUpload
          imageURL={image}
          type={'rows'}
          element={row}
          onUpdateState={onUpdateState}
        />
      </td>
      <td>
        {!focus && <span onClick={() => setFocus(true)}>{name}</span>}
        {focus && (
          <input
            value={name}
            onChange={(e) => onChange(e.target.value)}
            onKeyUp={(e) => updateRow(_id, e.currentTarget.value, e.key)}
          />
        )}
      </td>
      {arrayOfDots.map((element) => (
        <td key={element}>{'O'}</td>
      ))}
      <td></td>
      <td onClick={() => onDelete(_id)}>
        <button>-</button>
      </td>
    </tr>
  );
};

export default Row;
export type { Props };
