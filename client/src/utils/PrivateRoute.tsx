/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route, RouteProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  const data: any = true;
  const loading: any = false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!data || loading) return null;

        // user not logged in
        if (!data) {
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
