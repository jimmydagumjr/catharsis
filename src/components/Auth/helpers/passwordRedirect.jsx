import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthCSS from "./../../../assets/css/Auth.module.css";

const PasswordRedirect = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // clear interval and navigate when countdown reaches 0
    if (countdown === 0) {
      clearInterval(countdownInterval);
      navigate("/");
    }

    // clear interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [countdown, navigate]);

  return (
    <>
      <p className={AuthCSS.stateMessage}>
        password has successfully been updated...
      </p>
      <div className={AuthCSS.break} />
      <p className={AuthCSS.stateMessage}>redirecting you in {countdown}</p>
    </>
  );
};

export default PasswordRedirect;
