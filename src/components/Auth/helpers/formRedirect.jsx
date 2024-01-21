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

export default formRedirect;
