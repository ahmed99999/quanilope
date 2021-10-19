import React, { useEffect, useState } from 'react';
import { ColumnIdentifier, ColumnRequest } from '../../type';

interface Props {
  onLoad?: () => Promise<ColumnIdentifier[]>;
  onCreate: (column: ColumnRequest) => Promise<ColumnIdentifier>;
}

const Columns = ({
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
}: Props) => {
  const [columns, setColumns] = useState<ColumnIdentifier[]>([]);

  useEffect(() => {
    const getColumns = async () => {
      const columns = await onLoad();
      setColumns(columns);
    };

    getColumns();
  }, [onLoad]);
  return <th></th>;
};

export default Columns;
export type { Props };
