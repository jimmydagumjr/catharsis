import { supabase } from "../../../lib/helper/supaBaseClient.jsx";
import validateInput from "./validateInput.jsx";

const resetPassword = async (
  baseURL,
  email,
  setLoading,
  setError,
  setResetPasswordMessage,
) => {
  try {
    setLoading(true);

    // input validation
    if (!validateInput({ email }, setError, setLoading)) {
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("invalid email address");
      setLoading(false);
      return;
    }

    // supabase reset password
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseURL}/reset-password`,
    });

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // successful password reset email sent
    setResetPasswordMessage(true);
    setLoading(false);

    // handle misc errors
  } catch (error) {
    console.error("reset password error: ", error);
    setError("failed to reset password");
    setLoading(false);
  }
};

export default resetPassword;
