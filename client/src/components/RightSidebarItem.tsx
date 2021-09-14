import React, { ReactElement } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link, useRouteMatch } from 'react-router-dom';

interface RightSidebarItemProps {
  icon: ReactElement;
  text: string;
  routePath: string;
}

const RightSidebarItem: React.FC<RightSidebarItemProps> = ({
  icon,
  text,
  routePath,
}) => {
  const { path } = useRouteMatch();
  return (
    <Link to={`${path}/${routePath}`}>
      <Box
        p="1.5"
        cursor="pointer"
        fontWeight="semibold"
        d="flex"
        px="3"
        borderRadius="40px"
        _hover={{ color: '#125D98' }}
        alignItems="center"
      >
        {icon}
        <Text ml="2">{text}</Text>
      </Box>
    </Link>
  );
};

export default RightSidebarItem;
