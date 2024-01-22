import AuthCSS from "./../../../assets/css/Auth.module.css";
import { PasswordIcon, LoadingIcon } from "../../../assets/svgs/AuthIcons.jsx";

const AuthUpdatePasswordForm = ({
  error,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  updatePassword,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
  };

  return (
    <>
      {error && <p className={AuthCSS.error}>{error}</p>}
      <form className={AuthCSS.formContainer} onSubmit={handleSubmit}>
        <div className={AuthCSS.labelContainer}>
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
        <button className={AuthCSS.submitButtons} type="submit">
          update password
        </button>
        <div className={AuthCSS.break} />
        <div className={AuthCSS.loadingContainer}>
          {loading && <LoadingIcon className={AuthCSS.loading} />}
        </div>
      </form>
    </>
  );
};

export default AuthUpdatePasswordForm;
