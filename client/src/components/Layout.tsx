import React from 'react';
import Wrapper, { WrapperVarient } from './Wrapper';

interface LayoutProps {
  varient: WrapperVarient;
}

// eslint-disable-next-line react/prop-types
const Layout: React.FC<LayoutProps> = ({ varient, children }) => {
  return (
    <>
      <Wrapper varient={varient}>{children}</Wrapper>
    </>
  );
};

export default Layout;
