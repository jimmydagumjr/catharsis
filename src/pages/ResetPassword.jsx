import { useState, useEffect } from "react";
import Auth from "../components/Auth/Auth.jsx";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import AuthCSS from "./../assets/css/Auth.module.css";
import LoginCSS from "./../assets/css/Login.module.css";
import { useDispatch } from "react-redux";
import { setPasswordRecoveryEvent } from "../redux/resetPasswordSlice.jsx";

const ResetPassword = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // get query parameters from URL
    const getQueryParam = (name) => {
      const urlParams = new URLSearchParams(window.location.hash.slice(1));
      return urlParams.get(name);
    };

    // check for error conditions
    const error = getQueryParam("error");
    const errorCode = getQueryParam("error_code");

    if (error === "unauthorized_client" && errorCode === "401") {
      setErrorMessage("email link is invalid or has expired");
    }

    supabase.auth.onAuthStateChange(async (e) => {
      if (e == "PASSWORD_RECOVERY") {
        setAccessGranted(true);
        dispatch(setPasswordRecoveryEvent(true));
      }
    });
  }, [dispatch]);
  return (
    <div className={LoginCSS.loginBody}>
      <div className={AuthCSS.authBody}>
        {errorMessage ? (
          <p className={AuthCSS.stateMessage}>{errorMessage}</p>
        ) : accessGranted ? (
          <Auth />
        ) : (
          <p className={AuthCSS.stateMessage}>no access</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
