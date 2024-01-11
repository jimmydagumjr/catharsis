import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./../redux/userSessionSlice.jsx";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const userSession = useSelector((state) => state.userSession);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          dispatch(setSession(session));
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

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }
  };

  const redirectToRegister = () => {
    console.log("register");
    setShowRegisterForm(true);
  };

  const redirectToResetPassword = () => {
    console.log("resetpw");
    setShowForgotPasswordForm(true);
  };

  const signInWithGithub = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userSession.isAuthenticated) {
      navigate("/");
      console.log(userSession.isAuthenticated);
    }
  }, [userSession.isAuthenticated, navigate]);

  if (redirecting) {
    return <p>redirecting...</p>;
  }

  return (
    <div className={AuthCSS.authBody}>
      {showRegisterForm ? (
        <AuthRegisterForm />
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
        <br />
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

      <button
        className={AuthCSS.signInButton}
        type="button"
        onClick={signInWithEmail}
      >
        sign in
      </button>
      <button
        className={AuthCSS.miscButtons}
        type="button"
        onClick={redirectToResetPassword}
      >
        forgot password
      </button>
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

const AuthRegisterForm = () => (
  <div>register</div>
);

const AuthForgotPasswordForm = () => (
  <div>forgot password</div>
);

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
