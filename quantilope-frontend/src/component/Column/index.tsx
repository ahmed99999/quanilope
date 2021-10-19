import React, { useState } from 'react';
import { ColumnIdentifier, ColumnRequest } from '../../type';

interface Props {
  column: ColumnIdentifier;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, column: ColumnRequest) => Promise<ColumnIdentifier>;
}

const Column = ({
  column: currentColumn,
  onDelete = async () => null,
  onUpdate = async () => ({ _id: '', name: '' }),
}: Props) => {
  const [column, setColumn] = useState<ColumnIdentifier>(currentColumn);
  const [focus, setFocus] = useState<boolean>(false);

  const { _id, name } = column;

  const updateColumn = async (_id: string, name: string, keyCode: string) => {
    if (keyCode !== 'Enter') return;
    const updatedColumn = await onUpdate(_id, { name });
    setColumn(updatedColumn);
    setFocus(false);
  };

  const onChange = (value: string) =>
    setColumn({ _id: column._id, name: value });

  return (
    <td>
      {!focus && <span onClick={() => setFocus(true)}>{name}</span>}
      {focus && (
        <input
          value={name}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={(e) => updateColumn(_id, e.currentTarget.value, e.key)}
        />
      )}
    </td>
  );
};

export default Column;
export type { Props };
