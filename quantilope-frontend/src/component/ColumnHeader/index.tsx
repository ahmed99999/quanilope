import React, { useState } from 'react';
import { ColumnIdentifier } from '../../type';

import ImageUploadComponent from '../../component/ImageUpload';
import ImageUploadContainer from '../../container/ImageUpload';

interface Props {
  column: ColumnIdentifier;
}

const ImageUpload = ImageUploadContainer(ImageUploadComponent);

const Column = ({ column: currentColumn }: Props) => {
  const [column, setColumn] = useState<ColumnIdentifier>(currentColumn);

  const onUpdateState = (column: ColumnIdentifier) => setColumn(column);

  return (
    <td>
      <ImageUpload
        imageURL={column.image}
        type={'columns'}
        element={column}
        onUpdateState={onUpdateState}
      />
    </td>
  );
};

export default Column;
export type { Props };
