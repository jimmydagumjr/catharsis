import AuthCSS from "./../../../assets/css/Auth.module.css";
import { EmailIcon, LoadingIcon } from "../../../assets/svgs/AuthIcons.jsx";

const AuthForgotPasswordForm = ({
  error,
  email,
  setEmail,
  resetPassword,
  redirectToLogin,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <>
      {error && <p className={AuthCSS.error}>{error}</p>}
      <form className={AuthCSS.formContainer} onSubmit={handleSubmit}>
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
        <button className={AuthCSS.submitButtons} type="submit">
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
};

export default AuthForgotPasswordForm;
