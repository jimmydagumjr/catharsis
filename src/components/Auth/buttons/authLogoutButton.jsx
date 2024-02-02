import signOut from "../helpers/signOut.jsx";

const authLogoutButton = () => {
  return <button onClick={signOut}>log out</button>;
};

export default authLogoutButton;
