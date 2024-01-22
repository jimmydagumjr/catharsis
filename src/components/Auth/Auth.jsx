import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../redux/sessionSlice.jsx";
import AuthCSS from "./../../assets/css/Auth.module.css";
import signInWithEmail from "./helpers/signInWithEmail.jsx";
import signInWithGithub from "./helpers/signInWithGithub.jsx";
import registerUser from "./helpers/registerUser.jsx";
import resetPassword from "./helpers/resetPassword.jsx";
import updatePassword from "./helpers/updatePassword.jsx";
import PasswordRedirect from "./helpers/passwordRedirect.jsx";
import formRedirect from "./helpers/formRedirect.jsx";
import authRedirection from "./helpers/authRedirection.jsx";
import AuthLoginForm from "./forms/authLoginForm.jsx";
import AuthRegisterForm from "./forms/authRegisterForm.jsx";
import AuthForgotPasswordForm from "./forms/authForgotPasswordForm.jsx";
import AuthUpdatePasswordForm from "./forms/authUpdatePasswordForm.jsx";

const Auth = () => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState(false);
  const [updatePasswordMessage, setUpdatePasswordMessage] = useState(false);
  const passwordRecoveryEvent = useSelector(
    (state) => state.resetPassword.passwordRecoveryEvent,
  );

  // base url for use in redirection after sign in w/ OAuth
  const baseURL = "http://localhost:5173";

  // form redirects
  const handleFormRedirect = formRedirect(
    error,
    setError,
    setShowLoginForm,
    setShowRegisterForm,
    setShowForgotPasswordForm,
    setShowUpdatePasswordForm,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
  );

  // email sign in
  const handleSignInWithEmail = () => {
    signInWithEmail(
      email,
      password,
      setLoading,
      setError,
      dispatch,
      setSession,
    );
  };

  // github sign in
  const handleSignInWithGithub = () => {
    signInWithGithub(baseURL, setLoading, setError, dispatch, setSession);
  };

  // register user
  const handleRegisterUser = () => {
    registerUser(
      username,
      email,
      password,
      confirmPassword,
      setLoading,
      setError,
      setVerificationMessage,
      dispatch,
      setSession,
    );
  };

  // reset password
  const handleResetPassword = () => {
    resetPassword(
      baseURL,
      email,
      setLoading,
      setError,
      setResetPasswordMessage,
    );
  };

  const handleUpdatePassword = () => {
    updatePassword(
      password,
      confirmPassword,
      setLoading,
      setError,
      setUpdatePasswordMessage,
      dispatch,
    );
  };

  // redirect if authenticated account
  authRedirection(session, navigate, setVerificationMessage, setRedirecting);

  // change form on password recovery event
  useEffect(() => {
    if (passwordRecoveryEvent) {
      handleFormRedirect("updatePassword");
    }
  }, [passwordRecoveryEvent]);

  // messages for states
  switch (true) {
    case redirecting:
      return <p className={AuthCSS.stateMessage}>redirecting...</p>;
    case verificationMessage:
      return <p className={AuthCSS.stateMessage}>please verify your email</p>;
    case resetPasswordMessage:
      return (
        <p className={AuthCSS.stateMessage}>
          please check your email to reset your password
        </p>
      );
    case updatePasswordMessage:
      return <PasswordRedirect />;
    default:
      break;
  }

  return (
    <div className={AuthCSS.authBody}>
      {showRegisterForm ? (
        <AuthRegisterForm
          error={error}
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          registerUser={() => handleRegisterUser()}
          redirectToLogin={() => handleFormRedirect("login")}
          loading={loading}
        />
      ) : showForgotPasswordForm ? (
        <AuthForgotPasswordForm
          error={error}
          email={email}
          setEmail={setEmail}
          resetPassword={() => handleResetPassword()}
          redirectToLogin={() => handleFormRedirect("login")}
          loading={loading}
        />
      ) : showLoginForm ? (
        <AuthLoginForm
          error={error}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          signInWithGithub={() => handleSignInWithGithub()}
          signInWithEmail={() => handleSignInWithEmail()}
          redirectToResetPassword={() => handleFormRedirect("resetPassword")}
          redirectToRegister={() => handleFormRedirect("register")}
          loading={loading}
        />
      ) : showUpdatePasswordForm ? (
        <AuthUpdatePasswordForm
          error={error}
          password={password}
          confirmPassword={confirmPassword}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          updatePassword={() => handleUpdatePassword()}
          loading={loading}
        />
      ) : (
        <>
          {console.log("error in auth component")}
          <p>error in auth component</p>
        </>
      )}
    </div>
  );
};

export default Auth;
