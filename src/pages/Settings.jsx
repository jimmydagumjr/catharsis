import SettingsCSS from "./../assets/css/Settings.module.css";
import AuthLogoutButton from "../components/Auth/buttons/authLogoutButton.jsx";

const Settings = () => {
  return (
    <div className={SettingsCSS.settingsBody}>
      <div>Settings</div>
      <AuthLogoutButton />
    </div>
  );
};

export default Settings;
