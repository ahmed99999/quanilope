import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/ImageUpload';
import { ColumnIdentifier, RowIdentifier, ApiResponse } from '../../type';
import Http from '../../service/Http';
import { uploadEndPoint } from '../../config.json';
import { toast } from 'react-toastify';

interface Props {
  imageURL?: string;
  type: 'rows' | 'columns';
  element: ColumnIdentifier | RowIdentifier;
  onUpdateState?: (row: RowIdentifier | ColumnIdentifier) => void;
}

const Container =
  (Component: ComponentType<ComponentProps>) =>
  ({ imageURL, type, element, onUpdateState }: Props) => {
    const { _id: elementId } = element;
    const onUpload = async (image: File) => {
      try {
        const requestData = new FormData();

        requestData.append('image', image);
        requestData.append('name', element.name);

        const response = await Http().post<
          ApiResponse<RowIdentifier | ColumnIdentifier>,
          FormData
        >(`${uploadEndPoint}/${type}/${elementId}`, requestData);

        const updatedElement = response.data;

        toast.success('image uploaded successfully');

        return updatedElement;
      } catch (error) {
        console.error(error);
        toast.error('image could not be uploaded');
        return {
          _id: '',
          image: '',
          name: '',
        };
      }
    };

    return (
      <Component
        imageURL={imageURL}
        onUpload={onUpload}
        onUpdate={onUpdateState}
      />
    );
  };

export default Container;
