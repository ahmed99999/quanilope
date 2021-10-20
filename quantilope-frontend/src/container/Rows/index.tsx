import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Rows';
import Http from '../../service/Http';
import { ROWS_ENDPOINT } from '../../constant';
import { toast } from 'react-toastify';
import { ApiResponse, RowIdentifier, RowRequest } from '../../type';

interface Props {
  numberOfColumns: number;
}

const Container =
  (Component: ComponentType<ComponentProps>) =>
  ({ numberOfColumns }: Props) => {
    const onLoad = async () => {
      const response = await Http().get<ApiResponse<RowIdentifier[]>>(
        ROWS_ENDPOINT
      );

      const rows: RowIdentifier[] = response.data;
      return rows;
    };

    const onCreate = async (row: RowRequest): Promise<RowIdentifier> => {
      try {
        const response = await Http().post<
          ApiResponse<RowIdentifier>,
          RowRequest
        >(ROWS_ENDPOINT, row);

        toast.success('row created successfully');

        return response.data;
      } catch (error) {
        console.error(error);
        toast.error('could not create a new row');
        return {
          _id: '',
          name: '',
        };
      }
    };

    const onDelete = async (rowId: string): Promise<string> => {
      try {
        const response = await Http().delete<ApiResponse<RowIdentifier>>(
          `${ROWS_ENDPOINT}/${rowId}`
        );
        const { _id: deletedRowId } = response.data;

        toast.success('row deleted successfully');

        return deletedRowId;
      } catch (error) {
        console.error(error);
        toast.error('row could not be deleted');
        return '';
      }
    };

    return (
      <Component
        onLoad={onLoad}
        onCreate={onCreate}
        onDelete={onDelete}
        numberOfColumns={numberOfColumns}
      />
    );
  };

export default Container;
