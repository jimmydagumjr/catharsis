import { supabase } from "../../../lib/helper/supaBaseClient.jsx";
import validateInput from "./validateInput.jsx";

const signInWithEmail = async (
  email,
  password,
  setLoading,
  setError,
  dispatch,
  setSession,
) => {
  try {
    setLoading(true);

    // input validation
    if (!validateInput({ email, password }, setError, setLoading)) {
      return;
    }

    // supabase sign in w/ email
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // successful validation
    if (session) {
      dispatch(setSession(session));
      setLoading(false);
      return;
    }

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // handle misc errors
  } catch (error) {
    console.error("sign-in error: ", error);
    setError("failed to sign in");
    setLoading(false);
  }
};

export default signInWithEmail;
