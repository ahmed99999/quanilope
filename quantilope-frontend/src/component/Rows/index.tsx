import React, { useEffect, useState } from 'react';
import { RowIdentifier, RowRequest } from '../../type';

interface Props {
  onLoad?: () => Promise<RowIdentifier[]>;
  onCreate?: (row: RowRequest) => Promise<RowIdentifier>;
}

const Rows = ({
  onLoad = async () => [],
  onCreate = async () => ({ _id: '', name: '' }),
}: Props) => {
  const [rows, setRows] = useState<RowIdentifier[]>([]);

  useEffect(() => {
    const getRows = async () => {
      const rows = await onLoad();
      setRows(rows);
    };

    getRows();
  }, [onLoad]);
  return <table></table>;
};

export default Rows;
export type { Props };
