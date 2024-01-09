import { useState, useEffect } from "react";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";

const Auth = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
        console.log(error.message);
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
    }
    if (!session) {
      return <div>check inbox for email verification</div>;
    }
    setLoading(false);
  };

  return <div>Auth</div>;
};

export default Auth;
