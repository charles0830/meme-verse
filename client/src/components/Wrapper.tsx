import React from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVarient = 'reguler' | 'small';

interface wrapperProps {
  // eslint-disable-next-line react/require-default-props
  varient?: WrapperVarient;
}

// eslint-disable-next-line react/prop-types
const Wrapper: React.FC<wrapperProps> = ({ children, varient = 'reguler' }) => {
  return (
    <Box
      mt={3}
      maxW={varient === 'reguler' ? '960px' : '400px'}
      height="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
