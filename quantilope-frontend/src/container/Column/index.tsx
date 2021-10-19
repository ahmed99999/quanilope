import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/ColumnBody';
import { ColumnIdentifier, ColumnRequest, ApiResponse } from '../../type';
import { COLUMNS_ENDPOINT } from '../../constant';
import Http from '../../service/Http';
import { toast } from 'react-toastify';

interface Props {
  column: ColumnIdentifier;
  onDelete?: (id: string) => void;
}

const Container =
  (Component: ComponentType<ComponentProps>) =>
  ({ column, onDelete }: Props) => {
    const onUpdate = async (
      columnId: string,
      column: ColumnRequest
    ): Promise<ColumnIdentifier> => {
      try {
        const response = await Http().put<
          ApiResponse<ColumnIdentifier>,
          ColumnRequest
        >(`${COLUMNS_ENDPOINT}/${columnId}`, column);

        const updatedColumn = response.data;
        return updatedColumn;
      } catch (error) {
        console.error(error);
        toast.error('column could not be updated');
        return {
          _id: columnId,
          name: column.name,
          image: column.image,
        };
      }
    };

    return (
      <Component column={column} onDelete={onDelete} onUpdate={onUpdate} />
    );
  };

export default Container;
