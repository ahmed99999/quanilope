import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Column';
import { ColumnIdentifier, ColumnRequest, ApiResponse } from '../../type';
import { COLUMNS_ENDPOINT } from '../../constant';
import Http from '../../service/Http';
import { toast } from 'react-toastify';

interface Props {
  column: ColumnIdentifier;
}

const Container =
  (Component: ComponentType<ComponentProps>) =>
  ({ column }: Props) => {
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
        toast.success('column updated successfully');

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

    return <Component column={column} onUpdate={onUpdate} />;
  };

export default Container;
