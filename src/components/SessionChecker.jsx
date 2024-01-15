import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../redux/sessionSlice.jsx";
import { supabase } from "./../lib/helper/supaBaseClient.jsx";

const SessionChecker = () => {
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.session);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          dispatch(setSession(session));
        }
      } catch (error) {
        console.error("user session: ", error);
      }
    };

    if (!hasRunRef.current) {
      fetchUserData();

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (
          session &&
          JSON.stringify(session) !== JSON.stringify(currentSession)
        ) {
          dispatch(setSession(session));
        }
      });

      hasRunRef.current = true;

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [dispatch, currentSession]);

  return null;
};

export default SessionChecker;
