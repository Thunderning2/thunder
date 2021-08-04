import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ready } from '../store/auth';
import { fetchMyGuilds } from '../store/guilds';
import { fetchUsers } from '../store/users';
import LoadingPage from './pages/loading-page';

const PrivateRoute: React.FunctionComponent<RouteProps> = (props) => {
  const user = useSelector((s: Store.AppStore) => s.auth.user);
  const attemptedLogin = useSelector((s: Store.AppStore) => s.auth.attemptedLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ready());
    dispatch(fetchMyGuilds());
    dispatch(fetchUsers());
  }, []);

  if (attemptedLogin && !user)
    return <Redirect to="/login" />;
  else if (!user)
    return <LoadingPage />;
  
  return (
    <Route {...props} />
  );
}
 
export default PrivateRoute;