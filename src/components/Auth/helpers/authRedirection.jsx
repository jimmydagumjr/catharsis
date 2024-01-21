const authRedirection = (
  session,
  navigate,
  setVerificationMessage,
  setRedirecting,
) => {
  if (session.user) {
    if (
      session.user.user_metadata.email_verified === false ||
      !session.user.email_confirmed_at
    ) {
      setVerificationMessage(true);
    } else if (
      session.user.user_metadata.email_verified === true ||
      session.user.email_confirmed_at
    ) {
      navigate("/");
    }
  } else {
    setRedirecting(false);
  }
};

export default authRedirection;
