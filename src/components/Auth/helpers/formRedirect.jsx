const formRedirect =
  (
    error,
    setError,
    setShowLoginForm,
    setShowRegisterForm,
    setShowForgotPasswordForm,
    setShowUpdatePasswordForm,
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
        resetState(
          setShowLoginForm,
          setShowRegisterForm,
          setShowForgotPasswordForm,
          setShowUpdatePasswordForm,
        );
        setShowRegisterForm(true);
        break;
      case "resetPassword":
        resetState(
          setShowLoginForm,
          setShowRegisterForm,
          setShowForgotPasswordForm,
          setShowUpdatePasswordForm,
        );
        setShowForgotPasswordForm(true);
        break;
      case "login":
        resetState(
          setShowLoginForm,
          setShowRegisterForm,
          setShowForgotPasswordForm,
          setShowUpdatePasswordForm,
        );
        setShowLoginForm(true);
        break;
      case "updatePassword":
        resetState(
          setShowLoginForm,
          setShowRegisterForm,
          setShowForgotPasswordForm,
          setShowUpdatePasswordForm,
        );
        setShowUpdatePasswordForm(true);
      default:
        break;
    }
  };

const resetState = (
  setShowLoginForm,
  setShowRegisterForm,
  setShowForgotPasswordForm,
  setShowUpdatePasswordForm,
) => {
  setShowLoginForm(false);
  setShowRegisterForm(false);
  setShowForgotPasswordForm(false);
  setShowUpdatePasswordForm(false);
};

export default formRedirect;
