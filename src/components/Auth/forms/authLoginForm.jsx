import AuthCSS from "./../../../assets/css/Auth.module.css";
import {
  EmailIcon,
  PasswordIcon,
  GithubIcon,
  LoadingIcon,
} from "../../../assets/svgs/AuthIcons.jsx";

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
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmail();
  };
  return (
    <>
      {error && <p className={AuthCSS.error}>{error}</p>}
      <form className={AuthCSS.formContainer} onSubmit={handleSubmit}>
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
        <button className={AuthCSS.submitButtons} type="submit">
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
};

export default AuthLoginForm;
