import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../redux/sessionSlice.jsx";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import {
  EmailIcon,
  PasswordIcon,
  GithubIcon,
  LoadingIcon,
} from "../assets/svgs/AuthIcons.jsx";
import AuthCSS from "./../assets/css/Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const session = useSelector((state) => state.session);

  // check if current session already exists(make sure user is signed out)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          if (window.location.pathname !== "/") {
            navigate("/");
          }
        } else {
          setRedirecting(false);
        }
      } catch (error) {
        console.error("user session: ", error);
        setRedirecting(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      if (session) {
        navigate("/");
      } else {
        setRedirecting(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, navigate]);

  // form redirects
  const redirectToRegister = () => {
    if (error) setError(null);
    setShowRegisterForm(true);
  };

  const redirectToResetPassword = () => {
    if (error) setError(null);
    setShowForgotPasswordForm(true);
  };

  const redirectToLogin = () => {
    if (error) setError(null);
    if (showRegisterForm) setShowRegisterForm(false);
    if (showForgotPasswordForm) setShowForgotPasswordForm(false);
  };

  // email sign in
  const signInWithEmail = async () => {
    try {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message.toLowerCase());
        setLoading(false);
        return;
      }

      dispatch(setSession(session));
    } catch (error) {
      console.error("sign-in error: ", error);
      setError("failed to sign in");
      setLoading(false);
    }
  };

  // github sign in
  const signInWithGithub = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) {
        setError(error.message.toLowerCase());
        setLoading(false);
        return;
      }

      dispatch(setSession(session));
    } catch (error) {
      console.error("sign-in error: ", error);
      setError("failed to sign in");
      setLoading(false);
    }
  };

  // register user
  const registerUser = async () => {
    try {
      setLoading(true);

      if (password !== confirmPassword) {
        setError("passwords don't match");
        setLoading(false);
        return;
      }

      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message.toLowerCase());
        setLoading(false);
        return;
      }

      dispatch(setSession(session));
    } catch (error) {
      console.error("registration error: ", error);
      setError("failed to register user");
      setLoading(false);
    }
  };

  // redirect if authenticated account
  useEffect(() => {
    if (session.isAuthenticated) {
      navigate("/");
    }
  }, [session.isAuthenticated, navigate]);

  if (redirecting) {
    return <p>redirecting...</p>;
  }

  return (
    <div className={AuthCSS.authBody}>
      {showRegisterForm ? (
        <AuthRegisterForm
          error={error}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          registerUser={registerUser}
          redirectToLogin={redirectToLogin}
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
          signInWithGithub={signInWithGithub}
          signInWithEmail={signInWithEmail}
          redirectToResetPassword={redirectToResetPassword}
          redirectToRegister={redirectToRegister}
          loading={loading}
        />
      )}
    </div>
  );
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
  email,
  password,
  confirmPassword,
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

//   const changePassword = async () => {
//     setLoading(true);
//     const { error } = await supabase.auth.update({
//       password: password,
//     });

//     if (error) {
//       console.log(error.message);
//     }
//     setLoading(false);
//   };

//   const signUpWithEmail = async () => {
//     setLoading(true);
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       console.log(error.message);
//     }
//     if (!session) {
//       return <div>check inbox for email verification</div>;
//     }
//     setLoading(false);
//   };
