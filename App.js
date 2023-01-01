import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/HomePage";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/auth-slice";

function App() {
  const dispatch = useDispatch();

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(
          userActions.loggedIn({
            email: user.email,
            token: idTokenResult.token,
          })
        );
      } else {
        console.log("no user");
      }
    });

    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
