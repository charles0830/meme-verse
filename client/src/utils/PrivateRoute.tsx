/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from './reduxHook';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        // user not logged in
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { next: props.location.pathname },
              }}
            />
          );
        }

        const Component = component as any;

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
