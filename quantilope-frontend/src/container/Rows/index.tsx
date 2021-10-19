import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Rows';
import Http from '../../service/Http';
import { ROWS_ENDPOINT } from '../../constant';
import { ApiResponse, RowIdentifier, RowRequest } from '../../type';

const Container = (Component: ComponentType<ComponentProps>) => () => {
  const onLoad = async () => {
    const response = await Http().get<ApiResponse<RowIdentifier[]>>(
      ROWS_ENDPOINT
    );

    const rows: RowIdentifier[] = response.data;
    return rows;
  };

  const onCreate = async (row: RowRequest): Promise<RowIdentifier> => {
    const response = await Http().post<ApiResponse<RowIdentifier>, RowRequest>(
      ROWS_ENDPOINT,
      row
    );

    return response.data;
  };

  return <Component onLoad={onLoad} onCreate={onCreate} />;
};

export default Container;
