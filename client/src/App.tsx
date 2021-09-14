import { Box } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Box w="100%" maxH="100vh">
      <Navbar />
      <Wrapper varient="reguler">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/t" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Wrapper>
    </Box>
  );
}

export default App;
