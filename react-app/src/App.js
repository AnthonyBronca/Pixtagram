import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UserPages/UsersList";
import User from "./components/UserPages/Profile";
import EditUser from "./components/UserPages/EditUser";
import Splash from "./components/Splash/Splash";
import { authenticate } from "./store/session";
import Post from "./components/Post/Post";
import EditPost from "./components/PostPages/EditPost";
import Explore from "./components/Explore/Explore";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {session && <NavBar />}

      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path="/users/:userId/edit" exact={true}>
          <EditUser />
        </ProtectedRoute>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Splash />
        </ProtectedRoute>
        <ProtectedRoute path="/posts/:postId" exact={true}>
          <Post />
        </ProtectedRoute>
        <ProtectedRoute path="/posts/:postId/edit" exact={true}>
          <EditPost />
        </ProtectedRoute>
        <ProtectedRoute path="/explore-page" exact={true}>
          <Explore />
        </ProtectedRoute>
        <Route path="/page-not-found">
          <PageNotFound />
        </Route>
        <Route render={() => <Redirect to={{pathname: "/page-not-found"}} />} />
        <PageNotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
