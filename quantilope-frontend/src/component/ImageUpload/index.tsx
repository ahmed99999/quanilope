import React from 'react';
import { baseURL } from '../../config.json';

import style from './style.module.scss';
import plus from '../../img/plus-sign.png';

import { RowIdentifier, ColumnIdentifier } from '../../type';

interface Props {
  imageURL?: string;
  onUpload: (image: File) => Promise<RowIdentifier | ColumnIdentifier>;
  onUpdate?: (element: RowIdentifier | ColumnIdentifier) => void;
}

const ImageUpload = ({
  imageURL,
  onUpload = async () => ({ _id: '', name: '' }),
  onUpdate = async () => null,
}: Props) => {
  let fileRef: HTMLInputElement | null;

  const handelUploadImage = async (files: FileList | null) => {
    if (files === null) return;
    const image = files[0];
    const uploadedElement = await onUpload(image);
    await onUpdate(uploadedElement);
  };

  return (
    <>
      {imageURL && (
        <img className={style.img} src={`${baseURL}/${imageURL}`} alt='...' />
      )}
      {!imageURL && (
        <>
          <img onClick={() => fileRef?.click()} src={plus} alt='...' />
          <input
            className={style.file}
            ref={(fileInput) => (fileRef = fileInput)}
            type='file'
            onChange={(e) => handelUploadImage(e.target.files)}
          />
        </>
      )}
    </>
  );
};

export default ImageUpload;
export type { Props };
