import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
// import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { userActions } from "../../store/auth-slice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    if (user && user.token) {
      console.log("user is connected");
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const actionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("email sent to reset password");
        setEmail("");
        setLoading(false);
        toast.success("Email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        // const errorMessage = error.message;
        // toast.error(errorMessage);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading ... </h4> : <h4>Forgot password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="type your email"
          autoFocus
        />
        <br />
        {!loading ? (
          <button className="btn btn-primary" disabled={!email}>
            Create new password
          </button>
        ) : (
          <Button type="primary" loading disabled={!email}>
            Create new password
          </Button>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
