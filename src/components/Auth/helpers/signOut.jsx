import { useDispatch } from "react-redux";
import { setSession } from "../../../redux/sessionSlice.jsx";

const signOut = async () => {
  const dispatch = useDispatch();

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
