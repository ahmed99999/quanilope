import React from 'react';

interface Props {
  columnImage: string;
}

const Column = ({ columnImage }: Props) => (
  <td>
    {!columnImage && <button>+</button>}
    {columnImage && <img src={columnImage} alt='...' />}
  </td>
);

export default Column;
export type { Props };
