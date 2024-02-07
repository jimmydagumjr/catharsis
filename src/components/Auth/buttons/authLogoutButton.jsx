import { useDispatch } from "react-redux";
import signOut from "../helpers/signOut.jsx";

const AuthLogoutButton = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(dispatch);
  };
  return <button onClick={handleSignOut}>log out</button>;
};

export default AuthLogoutButton;
