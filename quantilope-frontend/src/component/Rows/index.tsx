import React, { useEffect } from 'react';
import { RowIdentifier } from '../../type';

interface Props {
  onLoad: () => Promise<void>;
}

const Rows = ({ onLoad }: Props) => {
  useEffect(() => {
    const response = onLoad();
  }, [onLoad]);
  return <div>rows</div>;
};

export default Rows;
export type { Props };
