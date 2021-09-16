import { Box } from '@chakra-ui/react';
import React from 'react';
import {
  CgProfile,
  IoNotificationsOutline,
  RiMoreFill,
  AiOutlineSetting,
} from 'react-icons/all';
import { CgFeed } from 'react-icons/cg';
import RightSidebarItem from './RightSidebarItem';

const RightSidebar: React.FC = () => {
  return (
    <Box d={{ base: 'flex', md: 'block' }} p="2" h="100%" w="200px">
      <RightSidebarItem
        text="Profile"
        icon={<CgProfile />}
        routePath="profile"
      />
      <RightSidebarItem text="Feed" icon={<CgFeed />} routePath="newsfeed" />
      <RightSidebarItem
        text="Notification"
        icon={<IoNotificationsOutline />}
        routePath="notification"
      />
      <RightSidebarItem
        text="Settings"
        icon={<AiOutlineSetting />}
        routePath="settings"
      />
      <RightSidebarItem text="More" icon={<RiMoreFill />} routePath="more" />
    </Box>
  );
};

export default RightSidebar;
