import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner size="md" />
    </Flex>
  );
};

export default Loader;
