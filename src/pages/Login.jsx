import { useEffect } from "react";
import Auth from "../components/Auth/Auth.jsx";
import LoginCSS from "./../assets/css/Login.module.css";
import { useDispatch } from "react-redux";
import { setPasswordRecoveryEvent } from "../redux/resetPasswordSlice.jsx";

const Login = () => {
  const dispatch = useDispatch();
  
  // reset password recovery event on initial mount of page
  useEffect(() => {
    return () => {
      dispatch(setPasswordRecoveryEvent(false));
      console.log("test");
    };
  }, [dispatch]);

  return (
    <div className={LoginCSS.loginBody}>
      <Auth />
    </div>
  );
};

export default Login;
