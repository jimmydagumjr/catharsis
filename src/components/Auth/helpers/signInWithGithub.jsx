import { supabase } from "../../../lib/helper/supaBaseClient.jsx";

const signInWithGithub = async (
  baseURL,
  setLoading,
  setError,
  dispatch,
  setSession,
) => {
  try {
    setLoading(true);

    // supabase auth sign in w/ github
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${baseURL}/music`,
      },
    });

    // handle supabase errors
    if (error) {
      setError(error.message.toLowerCase());
      setLoading(false);
      return;
    }

    // successful validation
    dispatch(setSession(session));

    // handle misc errors
  } catch (error) {
    console.error("sign-in error: ", error);
    setError("failed to sign in");
    setLoading(false);
  }
};

export default signInWithGithub;
