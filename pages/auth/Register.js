import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    if (user && user.token) {
      console.log("user is connected");
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    window.localStorage.setItem("emailForRegistration", email);

    toast.success(
      `Email is sent to ${email}, Click the link in the email to complete your registration`
    );

    setEmail("");
  };

  const registerForm = () => {
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
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
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
