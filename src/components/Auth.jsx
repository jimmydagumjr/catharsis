import { useState, useEffect } from "react";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import {
  EmailIcon,
  PasswordIcon,
  GithubIcon,
  LoadingIcon,
} from "../assets/svgs/AuthIcons.jsx";
import AuthCSS from "./../assets/css/Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className={AuthCSS.authBody}>
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

        {/* <button type="button" onClick={changePassword}>
          Change Password
        </button> */}
        <button className={AuthCSS.miscButtons} type="button">
          forgot password
        </button>
        <button className={AuthCSS.miscButtons} type="button">
          register
        </button>
        <div className={AuthCSS.loadingContainer}>
        {loading && <LoadingIcon className={AuthCSS.loading} />}
        </div>
      </form>
    </div>
  );
};

export default Auth;
