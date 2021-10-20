import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Row';
import { RowIdentifier, RowRequest, ApiResponse } from '../../type';
import { ROWS_ENDPOINT } from '../../constant';
import Http from '../../service/Http';
import { toast } from 'react-toastify';

interface Props {
  numberOfColumns: number;
  row: RowIdentifier;
  onDelete?: (id: string) => void;
}

const Container =
  (Component: ComponentType<ComponentProps>) =>
  ({ numberOfColumns, row, onDelete }: Props) => {
    const onUpdate = async (
      rowId: string,
      row: RowRequest
    ): Promise<RowIdentifier> => {
      try {
        const response = await Http().put<
          ApiResponse<RowIdentifier>,
          RowRequest
        >(`${ROWS_ENDPOINT}/${rowId}`, row);

        const updatedRow = response.data;

        toast.success('row updated successfully');

        return updatedRow;
      } catch (error) {
        console.error(error);
        toast.error('row could not be updated');
        return {
          _id: rowId,
          name: row.name,
          image: row.image,
        };
      }
    };

    return (
      <Component
        row={row}
        columnsNumber={numberOfColumns}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    );
  };

export default Container;
