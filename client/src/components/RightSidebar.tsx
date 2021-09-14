import { Box } from '@chakra-ui/react';
import React from 'react';
import { CgProfile } from 'react-icons/all';
import { CgFeed } from 'react-icons/cg';
import RightSidebarItem from './RightSidebarItem';

const RightSidebar: React.FC = () => {
  return (
    <Box p="2" h="100%" w="200px">
      <RightSidebarItem
        text="Profile"
        icon={<CgProfile />}
        routePath="profile"
      />
      <RightSidebarItem text="Feed" icon={<CgFeed />} routePath="newsfeed" />
    </Box>
  );
};

export default RightSidebar;
