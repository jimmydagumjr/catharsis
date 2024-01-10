import { useState, useEffect } from "react";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import {
  EmailIcon,
  PasswordIcon,
  GithubIcon,
} from "../assets/svgs/AuthIcons.jsx";
import AuthCSS from "./../assets/css/Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
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
      console.log(error.message);
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
    <div>
      {loading && <p>Loading...</p>}
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
          <br />
        </div>
        <div>
          <button type="button" onClick={signInWithEmail}>
            Sign In
          </button>
          <button type="button">Register</button>
        </div>

        {/* <button type="button" onClick={changePassword}>
          Change Password
        </button> */}

        <button type="button">forgot password</button>
      </form>
    </div>
  );
};

export default Auth;
