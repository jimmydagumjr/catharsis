import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../redux/sessionSlice.jsx";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import {
  UserIcon,
  EmailIcon,
  PasswordIcon,
  GithubIcon,
  LoadingIcon,
} from "../assets/svgs/AuthIcons.jsx";
import AuthCSS from "./../assets/css/Auth.module.css";

const Auth = () => {
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
  const session = useSelector((state) => state.session);
  const [verificationMessage, setVerificationMessage] = useState(false);

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
    signInWithGithub(setLoading, setError, dispatch, setSession);

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
        <AuthForgotPasswordForm />
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

const formRedirect =
  (
    error,
    setError,
    setShowRegisterForm,
    setShowForgotPasswordForm,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
  ) =>
  (action) => {
    if (error) setError(null);

    // reset form values
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    switch (action) {
      case "register":
        setShowRegisterForm(true);
        break;
      case "resetPassword":
        setShowForgotPasswordForm(true);
        break;
      case "login":
        setShowRegisterForm(false);
        setShowForgotPasswordForm(false);
        break;
      default:
        break;
    }
  };

const authRedirection = (
  session,
  navigate,
  setVerificationMessage,
  setRedirecting,
) => {
  if (session.user) {
    if (
      session.user.user_metadata.email_verified === false ||
      !session.user.email_confirmed_at
    ) {
      setVerificationMessage(true);
    } else if (
      session.user.user_metadata.email_verified === true ||
      session.user.email_confirmed_at
    ) {
      navigate("/");
    }
  } else {
    setRedirecting(false);
  }
};

const signInWithEmail = async (
  email,
  password,
  setLoading,
  setError,
  dispatch,
  setSession,
) => {
  try {
    setLoading(true);

    // input validation
    if (!validateInput({ email, password }, setError, setLoading)) {
      return;
    }

    // supabase sign in w/ email
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // successful validation
    if (session) {
      dispatch(setSession(session));
      setLoading(false);
      return;
    }

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // handle misc errors
  } catch (error) {
    console.error("sign-in error: ", error);
    setError("failed to sign in");
    setLoading(false);
  }
};

const signInWithGithub = async (setLoading, setError, dispatch, setSession) => {
  try {
    setLoading(true);

    // supabase auth sign in w/ github
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // successful validation
    dispatch(setSession(session));

    // handle misc errors
  } catch (error) {
    console.error("sign-in error: ", error);
    setError("failed to sign in");
    setLoading(false);
  }
};

const registerUser = async (
  username,
  email,
  password,
  confirmPassword,
  setLoading,
  setError,
  setVerificationMessage,
  dispatch,
  setSession,
) => {
  try {
    setLoading(true);

    // input validation
    if (
      !validateInput(
        { username, email, password, confirmPassword },
        setError,
        setLoading,
      )
    ) {
      return;
    }

    // username validation using regex(3-15 lowercase letters)
    const usernameRegex = /^[a-z]{3,15}$/;
    if (!usernameRegex.test(username)) {
      setError("username must be 3-15 lowercase letters");
      setLoading(false);
      return;
    }

    // password validation using regex (8 char, 1 uppercase letter)
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "password must contain a minimum of 8 characters and one uppercase letter",
      );
      setLoading(false);
      return;
    }

    // supabase auth sign up
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username.toLowerCase(),
        },
      },
    });

    // handle supabase errors
    if (error) {
      if (
        error.message.includes(
          "duplicate key value violates unique constraint",
        )
      ) {
        setError("username is not unique");
      } else {
      setError(error.message.toLowerCase());
      }
      setLoading(false);
      return;
    }

    // successful registration
    setVerificationMessage(true);
    dispatch(setSession(session));

    // handle misc errors
  } catch (error) {
    console.error("registration error: ", error);
    setError("failed to register user");
    setLoading(false);
  }
};

const validateInput = (...args) => {
  const { username, email, password, confirmPassword } = args[0];
  const [setError, setLoading] = args.slice(1);
  switch (true) {
    case "username" in args[0] && !username:
      setError("username is required");
      setLoading(false);
      return false;
    case "email" in args[0] && !email:
      setError("email is required");
      setLoading(false);
      return false;
    case "password" in args[0] && !password:
      setError("password is required");
      setLoading(false);
      return false;
    case "confirmPassword" in args[0] && password !== confirmPassword:
      setError("passwords don't match");
      setLoading(false);
      return false;
    default:
      return true;
  }
};

const AuthLoginForm = ({
  error,
  email,
  password,
  setEmail,
  setPassword,
  signInWithGithub,
  signInWithEmail,
  redirectToResetPassword,
  redirectToRegister,
  loading,
}) => (
  <>
    {error && <p className={AuthCSS.error}>{error}</p>}
    <form className={AuthCSS.formContainer}>
      <div className={AuthCSS.gButtonContainer}>
        <button type="button" onClick={signInWithGithub}>
          <GithubIcon />
        </button>
      </div>
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
        <div className={AuthCSS.break} />
        <label className={AuthCSS.formItem}>
          <PasswordIcon />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
      </div>
      <div className={AuthCSS.break} />
      <button
        className={AuthCSS.submitButtons}
        type="button"
        onClick={signInWithEmail}
      >
        sign in
      </button>
      <div className={AuthCSS.break} />
      <button
        className={AuthCSS.miscButtons}
        type="button"
        onClick={redirectToResetPassword}
      >
        forgot password
      </button>
      <div style={{ height: "0.2rem" }} />
      <button
        className={AuthCSS.miscButtons}
        type="button"
        onClick={redirectToRegister}
      >
        register
      </button>
      <div className={AuthCSS.loadingContainer}>
        {loading && <LoadingIcon className={AuthCSS.loading} />}
      </div>
    </form>
  </>
);

const AuthRegisterForm = ({
  error,
  username,
  email,
  password,
  confirmPassword,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  registerUser,
  redirectToLogin,
  loading,
}) => (
  <>
    {error && <p className={AuthCSS.error}>{error}</p>}
    <form className={AuthCSS.formContainer}>
      <div className={AuthCSS.labelContainer}>
        <label className={AuthCSS.formItem}>
          <UserIcon />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </label>
        <div className={AuthCSS.break} />
        <label className={AuthCSS.formItem}>
          <EmailIcon />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>
        <div className={AuthCSS.break} />
        <label className={AuthCSS.formItem}>
          <PasswordIcon />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </label>
        <div className={AuthCSS.break} />
        <label className={AuthCSS.formItem}>
          <div style={{ width: "3rem" }} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
        </label>
      </div>
      <div className={AuthCSS.break} />
      <button
        className={AuthCSS.submitButtons}
        type="button"
        onClick={registerUser}
      >
        register
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

const AuthForgotPasswordForm = () => <div>forgot password</div>;

export default Auth;
