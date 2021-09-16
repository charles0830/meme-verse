import { Box } from '@chakra-ui/react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import MemeDetails from './MemeDetails';
import RightSidebar from '../components/RightSidebar';
import Feed from './Feed';
import Profile from './Profile';

const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <Box w="full" d={{ sm: 'flex' }} maxH="100vh">
      <RightSidebar />
      <Box flex={{ sm: 1 }}>
        <Switch>
          <Route path={`${path}/newsfeed`} component={Feed} />
          <Route path={`${path}/meme/:memeId`} component={MemeDetails} />
          <Route path={`${path}/profile`} component={Profile} />
          <Redirect to={`${path}/newsfeed`} />
        </Switch>
      </Box>
    </Box>
  );
};

export default Dashboard;
