import { supabase } from "../../../lib/helper/supaBaseClient.jsx";
import validateInput from "./validateInput.jsx";

const registerUser = async (
  username,
  email,
  password,
  confirmPassword,
  setLoading,
  setError,
  setVerificationMessage,
  dispatch,
  setSession,
) => {
  try {
    setLoading(true);

    // input validation
    if (
      !validateInput(
        { username, email, password, confirmPassword },
        setError,
        setLoading,
      )
    ) {
      return;
    }

    // username validation using regex(3-15 lowercase letters)
    const usernameRegex = /^[a-z]{3,15}$/;
    if (!usernameRegex.test(username)) {
      setError("username must be 3-15 lowercase letters");
      setLoading(false);
      return;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("invalid email address");
      setLoading(false);
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

    // supabase auth sign up
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username.toLowerCase(),
        },
      },
    });

    // handle supabase errors
    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        setError("username is not unique");
      } else {
        setError(error.message.toLowerCase());
      }
      setLoading(false);
      return;
    }

    // successful registration
    setVerificationMessage(true);
    dispatch(setSession(session));

    // handle misc errors
  } catch (error) {
    console.error("registration error: ", error);
    setError("failed to register user");
    setLoading(false);
  }
};

export default registerUser;
