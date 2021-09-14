import { Box, Flex } from '@chakra-ui/react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import RightSidebar from '../components/RightSidebar';
import Feed from './Feed';
import Profile from './Profile';

const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <Flex>
      <Box flex={1}>
        <Switch>
          <Route path={`${path}/newsfeed`} component={Feed} />
          <Route path={`${path}/meme/:memeId`} component={PostDetails} />
          <Route path={`${path}/profile`} component={Profile} />
          <Redirect to={`${path}/newsfeed`} />
        </Switch>
      </Box>
      <RightSidebar />
    </Flex>
  );
};

export default Dashboard;
