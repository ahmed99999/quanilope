import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Columns';
import Http from '../../service/Http';
import { toast } from 'react-toastify';
import { COLUMNS_ENDPOINT } from '../../constant';
import { ApiResponse, ColumnIdentifier, ColumnRequest } from '../../type';

const Container = (Component: ComponentType<ComponentProps>) => () => {
  const onLoad = async () => {
    const response = await Http().get<ApiResponse<ColumnIdentifier[]>>(
      COLUMNS_ENDPOINT
    );

    const columns: ColumnIdentifier[] = response.data;
    return columns;
  };

  const onCreate = async (column: ColumnRequest): Promise<ColumnIdentifier> => {
    const response = await Http().post<
      ApiResponse<ColumnIdentifier>,
      ColumnRequest
    >(COLUMNS_ENDPOINT, column);

    return response.data;
  };

  const onDelete = async (ColumnId: string): Promise<string> => {
    try {
      const response = await Http().delete<ApiResponse<ColumnIdentifier>>(
        `${COLUMNS_ENDPOINT}/${ColumnId}`
      );
      const { _id: deletedColumnId } = response.data;
      return deletedColumnId;
    } catch (error) {
      console.error(error);
      toast.error('Column could not be deleted');
      return '';
    }
  };

  return <Component onLoad={onLoad} onCreate={onCreate} onDelete={onDelete} />;
};

export default Container;
