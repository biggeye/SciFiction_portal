import React, { createContext, useState, useEffect, useContext } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);

  const supabase=useSupabaseClient();
  

  useEffect(() => {
    // Set the initial user profile state
    setProfile(supabase.auth.user());

    // Subscribe to profile updates
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setProfile(session?.user || null);
    });

    return () => {
      // Unsubscribe from profile updates
      authListener.unsubscribe();
    };
  }, []);

  // Update user profile data
  const updateProfile = async (updates) => {
    const user = supabase.auth.user();

    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
        });

      if (error) {
        console.log("Error updating profile", error);
      } else if (data) {
        setProfile({ ...profile, ...updates });
      }
    } else {
      console.log("User is not logged in");
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export function useProfile() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useProfile must be used within a UserProvider");
  }

  return context;
}
