import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from "firebase/auth";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setEmail(
        window.prompt("Please provide your email & password for confirmation")
      );
      toast.error("Please provide your email & password for confirmation");
      return;
    }
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 caractere long");
      return;
    }
    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        
        if (result.user.emailVerified) {
          const user = auth.currentUser;
          await updatePassword(user, password);
          const idTokenResult = await getIdTokenResult(user);
          //redux store
          window.localStorage.removeItem("emailForRegistration");
          history.push("/");
          console.log("user : ", user, "token : ", idTokenResult);
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("no signin with email link");
    }
  };

  const completeRegistationForm = () => {
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
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
              disabled
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group my-3">
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
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete the registration</h4>
          {completeRegistationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
