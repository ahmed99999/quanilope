import React from 'react';
import { ColumnIdentifier } from '../../type';

interface Props {
  column: ColumnIdentifier;
}

const Column = ({ column }: Props) => {
  const { name, image } = column;
  return (
    <tr>
      <td>
        {!image && <button>+</button>}
        {image && <img src={image} alt='...' />}
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default Column;
export type { Props };
