import AdminCSS from "./../assets/css/Admin.module.css";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import { Auth } from "@supabase/auth-ui-react";

const Admin = () => {
  return (
    <div className={AdminCSS.adminBody}>
      <button className={AdminCSS.logInButton}>log in</button>
    </div>
  );
};

export default Admin;
