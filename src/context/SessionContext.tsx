import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Profile } from '@/types/db'; // Import Profile type

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        toast.error("Failed to load session.");
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        try {
          setSession(currentSession);
          setUser(currentSession?.user || null);
          if (currentSession?.user) {
            await fetchUserProfile(currentSession.user.id);
          } else {
            setIsAdmin(false); // Clear admin status on sign out
          }
        } catch (error) {
          console.error("Error during auth state change:", error);
          toast.error("Authentication state update failed.");
        } finally {
          setLoading(false);
        }
      }
    );

    getSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (error) {
      // Supabase's .single() method returns an error if no row is found.
      // The error code for 'no rows found' is typically 'PGRST116'.
      if (error.code === 'PGRST116') {
        console.warn(`No profile found for user ${userId}. Assuming not admin.`);
        setIsAdmin(false);
      } else {
        console.error('Error fetching user profile:', error);
        setIsAdmin(false);
        toast.error('Failed to load user profile.');
      }
    } else if (data) {
      setIsAdmin(data.is_admin);
    } else {
      // This case should ideally not be reached if error.code === 'PGRST116' is handled above,
      // but as a fallback, assume not admin if data is null.
      setIsAdmin(false);
    }
  };

  return (
    <SessionContext.Provider value={{ session, user, isAdmin, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};