import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/auth-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    console.log(user);
    if (user && user.token) {
      console.log("user is connected");
      history.push("/");
    }
  }, [user, history]);

  const provider = new GoogleAuthProvider();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(email, password);
    if (!email) {
      toast.error("Please provide your email & password for confirmation");
      return;
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 caractere long");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch(
        userActions.loggedIn({
          email: user.email,
          token: idTokenResult.token,
        })
      );
      toast.success("Authentification success");
      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.code);
    }
  };

  const googleSubmit = async () => {
    setLoading(true);
    console.log("google submit");
    try {
      signInWithPopup(auth, provider).then(async (res) => {
        console.log(res);
        const { user } = res;
        console.log(user);
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        dispatch(
          userActions.loggedIn({
            email: user.email,
            token: idTokenResult.token,
          })
        );

        history.push("/");
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setLoading(false);
  };

  const loginForm = () => {
    return (
      <React.Fragment>
        <form>
          <div className="form-group mt-3">
            <label htmlFor="email" className="mb-1">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoFocus
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="paswwsord"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter Password"
            />
          </div>
          {!loading ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              block
              shape="round"
              icon={<MailOutlined />}
              disabled={!email || password.length < 6}
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Login with Email/password
            </Button>
          ) : (
            <Button
              loading
              type="primary"
              onClick={handleSubmit}
              block
              shape="round"
              icon={<MailOutlined />}
              disabled={!email || password.length < 6}
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Login with Email/password
            </Button>
          )}

          {/* <small id="emailHelp" className="form-text text-muted">
              Enter email and 6 password long
            </small> */}
          <Button
            type="primary"
            danger
            onClick={googleSubmit}
            block
            shape="round"
            icon={<GoogleOutlined />}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Login with Google
          </Button>
        </form>
      </React.Fragment>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h4>Login</h4> : <h4> Loading ...</h4>}
          {loginForm()}
        </div>
        <Link
          to="/forgot/password"
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default Login;
