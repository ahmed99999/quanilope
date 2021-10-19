import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Rows';
import Http from '../../service/Http';

const Container = (Component: ComponentType<ComponentProps>) => () => {
  const onLoad = async () => {
    const response = await Http().get('/rows');
    console.log(response);
  };

  return <Component onLoad={onLoad} />;
};

export default Container;
