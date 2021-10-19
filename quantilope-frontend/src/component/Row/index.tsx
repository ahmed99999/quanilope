import React from 'react';

interface Props {
  row: string;
}

const Row = ({ row }: Props) => <div>{row}</div>;

export default Row;
export type { Props };
