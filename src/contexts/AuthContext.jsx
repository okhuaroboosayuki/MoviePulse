import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        setId(session.user.id);
        // check if user exists in the database
        const { data, error } = await supabase.from("Users").select("*").eq("user_id", session.user.id).single();
        if (error) console.error("Error fetching user data:", error.message);
        // if user exists, do nothing
        if (data) return;
        // if user does not exist, insert into the database
        await supabase.from("Users").insert([{ user_id: session.user.id, user_name: session.user.identities[0].identity_data.full_name, email: session.user.email }]);
      } else {
        setId(null);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setId(session.user.id);
      } else {
        setId(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    localStorage.setItem("isAuthenticated", true);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);

    localStorage.removeItem("isAuthenticated");
    setSession(null);
  };

  return <AuthContext.Provider value={{ session, id, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
