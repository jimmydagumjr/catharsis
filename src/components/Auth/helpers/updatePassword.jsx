import { supabase } from "../../../lib/helper/supaBaseClient.jsx";
import validateInput from "./validateInput.jsx";
import { setPasswordRecoveryEvent } from "../../../redux/resetPasswordSlice.jsx";

const updatePassword = async (
  password,
  confirmPassword,
  setLoading,
  setError,
  setUpdatePasswordMessage,
  dispatch,
) => {
  try {
    setLoading(true);

    // input validation
    if (!validateInput({ password, confirmPassword }, setError, setLoading)) {
      return;
    }

    // password validation using regex (8 char, 1 uppercase letter)
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "password must contain a minimum of 8 characters and one uppercase letter",
      );
      setLoading(false);
      return;
    }

    // supabase auth update password
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // successful password update
    else if (data) {
      setUpdatePasswordMessage(true);
      dispatch(setPasswordRecoveryEvent(false));
      setLoading(false);
    }

    // handle misc errors
  } catch (error) {
    console.error("update password error: ", error);
    setError("failed to update password");
    setLoading(false);
  }
};

export default updatePassword;
