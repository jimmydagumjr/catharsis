import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../redux/sessionSlice.jsx";
import { supabase } from "../../lib/helper/supaBaseClient.jsx";
import {
  UserIcon,
  EmailIcon,
  PasswordIcon,
  GithubIcon,
  LoadingIcon,
} from "../../assets/svgs/AuthIcons.jsx";
import AuthCSS from "./../../assets/css/Auth.module.css";
import signInWithEmail from "./helpers/signInWithEmail.jsx";
import signInWithGithub from "./helpers/signInWithGithub.jsx";
import registerUser from "./helpers/registerUser.jsx";
import formRedirect from "./helpers/formRedirect.jsx";
import authRedirection from "./helpers/authRedirection.jsx";
import AuthLoginForm from "./forms/authLoginForm.jsx";
import AuthRegisterForm from "./forms/authRegisterForm.jsx";

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
  const [redirecting, setRedirecting] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState(false);

  // base url for use in redirection after sign in w/ OAuth
  const baseURL = "http://localhost:5173";

  // form redirects
  const handleFormRedirect = formRedirect(
    error,
    setError,
    setShowRegisterForm,
    setShowForgotPasswordForm,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
  );

  // email sign in
  const handleSignInWithEmail = () =>
    signInWithEmail(
      email,
      password,
      setLoading,
      setError,
      dispatch,
      setSession,
    );

  // github sign in
  const handleSignInWithGithub = () =>
    signInWithGithub(baseURL, setLoading, setError, dispatch, setSession);

  // register user
  const handleRegisterUser = () =>
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

  // reset password
  const handleResetPassword = () => {
    resetPassword();
  };

  // redirect if authenticated account
  useEffect(() => {
    authRedirection(session, navigate, setVerificationMessage, setRedirecting);
  }, [session, navigate]);

  if (redirecting) {
    return <p>redirecting...</p>;
  }

  if (verificationMessage) {
    return <p>verify your email</p>;
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
          registerUser={handleRegisterUser}
          redirectToLogin={() => handleFormRedirect("login")}
          loading={loading}
        />
      ) : showForgotPasswordForm ? (
        <AuthForgotPasswordForm
          error={error}
          email={email}
          setEmail={setEmail}
          resetPassword={handleResetPassword}
          redirectToLogin={() => handleFormRedirect("login")}
          loading={loading}
        />
      ) : (
        <AuthLoginForm
          error={error}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          signInWithGithub={handleSignInWithGithub}
          signInWithEmail={handleSignInWithEmail}
          redirectToResetPassword={() => handleFormRedirect("resetPassword")}
          redirectToRegister={() => handleFormRedirect("register")}
          loading={loading}
        />
      )}
    </div>
  );
};

const resetPassword = () => {
  return;
};

const AuthForgotPasswordForm = ({
  error,
  email,
  setEmail,
  resetPassword,
  redirectToLogin,
  loading,
}) => (
  <>
    {error && <p className={AuthCSS.error}>{error}</p>}
    <form className={AuthCSS.formContainer}>
      <div className={AuthCSS.labelContainer}>
        <label className={AuthCSS.formItem}>
          <EmailIcon />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>
      </div>
      <div className={AuthCSS.break} />
      <button
        className={AuthCSS.submitButtons}
        type="button"
        onClick={resetPassword}
      >
        reset password
      </button>
      <div className={AuthCSS.break} />
      <button
        className={AuthCSS.miscButtons}
        type="button"
        onClick={redirectToLogin}
      >
        back
      </button>
      <div className={AuthCSS.loadingContainer}>
        {loading && <LoadingIcon className={AuthCSS.loading} />}
      </div>
    </form>
  </>
);

export default Auth;
