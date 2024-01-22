import { useEffect } from "react";
import { useSelector } from "react-redux";

const authRedirection = (
  session,
  navigate,
  setVerificationMessage,
  setRedirecting,
) => {
  const passwordRecoveryEvent = useSelector(
    (state) => state.resetPassword.passwordRecoveryEvent,
  );

  useEffect(() => {
    if (passwordRecoveryEvent) {
      setRedirecting(false);
    } else if (session.user) {
      if (
        session.user.user_metadata.email_verified === false ||
        !session.user.email_confirmed_at
      ) {
        setVerificationMessage(true);
      } else if (
        session.user.user_metadata.email_verified === true ||
        session.user.email_confirmed_at
      ) {
        setRedirecting(true);
        navigate("/");
      }
    } else {
      setRedirecting(false);
    }
  }, [
    passwordRecoveryEvent,
    session,
    navigate,
    setVerificationMessage,
    setRedirecting,
  ]);
};

export default authRedirection;
