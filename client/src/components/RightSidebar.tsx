import { Box } from '@chakra-ui/react';
import React from 'react';
import { CgProfile, IoNotificationsOutline, RiMoreFill } from 'react-icons/all';
import { CgFeed } from 'react-icons/cg';
import { GrSettingsOption } from 'react-icons/gr';
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
      <RightSidebarItem
        text="Notification"
        icon={<IoNotificationsOutline />}
        routePath="notification"
      />
      <RightSidebarItem
        text="Settings"
        icon={<GrSettingsOption />}
        routePath="settings"
      />
      <RightSidebarItem text="More" icon={<RiMoreFill />} routePath="more" />
    </Box>
  );
};

export default RightSidebar;
