import AuthCSS from "./../../../assets/css/Auth.module.css";
import {
   UserIcon,
   EmailIcon,
   PasswordIcon,
   LoadingIcon,
 } from "../../../assets/svgs/AuthIcons.jsx";

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

export default AuthRegisterForm;
