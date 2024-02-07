import { setSession } from "../../../redux/sessionSlice.jsx";
import { supabase } from "../../../lib/helper/supaBaseClient.jsx";

const signOut = async (dispatch) => {
  try {
    // sign out then update session
    const { error } = await supabase.auth.signOut();
    dispatch(setSession(null));

    // handle supabase errors
    if (error) console.log(error);
  } catch (error) {
    console.error("failed to log out: ", error);
  }
};

export default signOut;
