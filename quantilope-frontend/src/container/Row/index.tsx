import React, { ComponentType } from 'react';
import { Props as ComponentProps } from '../../component/Row';

const Container = (Component: ComponentType<ComponentProps>) => () => {
  return <Component row={''} />;
};

export default Container;
