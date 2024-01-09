import AdminCSS from "./../assets/css/Admin.module.css";
import { useState, useEffect } from "react";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Admin = () => {
  return (
    <div className={AdminCSS.adminBody}>
      <Authentication />
    </div>
  );
  // return (
  //   <div className={AdminCSS.adminBody}>
  //     <button className={AdminCSS.logInButton}>log in</button>
  //   </div>
  // );
};

const Authentication = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const CheckAdmin = async () => {
    const { data, error } = await supabase.from("users").select("auth.uid()");
    console.log(data);
  };
  const SignOut = async() => {
    const { error } = await supabase.auth.signOut();
    setSession(session);
    console.log(session);
  }
  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["github"]}
        showLinks={true}
        redirectTo={window.location.origin}
      />
    );
  } else {
    CheckAdmin();
    return <button onClick={SignOut}>log out</button>;
  }
};

export default Admin;
